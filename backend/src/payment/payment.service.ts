import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EOrderStatus } from '../order/order-status.enum';
import { OrderService } from '../order/order.service';
import { Pagination } from '../pagination/pagination';
import { PaypalService } from '../paypal/paypal.service';
import { User } from '../user/entities/user.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { EPaymentStatus } from './payment-status.enum';
import { PaymentPaginationOptions } from './payment.pagination';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>,
    private readonly paypalService: PaypalService,
    private readonly orderService: OrderService,
  ) {}

  async create(dto: CreatePaymentDto) {
    const record = this.paymentRepository.create(dto);
    return this.paymentRepository.save(record);
  }

  async getById(id: number) {
    const record = await this.paymentRepository.findOne({ where: { id } });
    if (!record) throw new NotFoundException();
    return record;
  }

  async getByPaypalPaymentId(paymentId: string) {
    const record = await this.paymentRepository.findOne({ where: { paypalPaymentId: paymentId } });
    if (!record) throw new NotFoundException();
    return record;
  }

  async update(id: number, data: Payment) {
    await this.getById(id);
    return this.paymentRepository.update({ id }, data);
  }

  async refund(orderId: number) {
    // get order by id
    const order = await this.orderService.findOne(orderId);
    // find order by order id
    const paymentRecord = await this.paymentRepository.find({ where: { orderId } });
    // perform refund for each record
    for (const record of paymentRecord) {
      // request refund
      await this.paypalService.refund(record.id, record.captureId, record.amount);
      // set payment status to refunded
      record.status = EPaymentStatus.REFUNDED;
      await this.update(record.id, record);
    }
    // update order status
    order.status = EOrderStatus.REFUNDED;
    await this.orderService.update(orderId, order);
  }

  async paginate(options: PaymentPaginationOptions) {
    const queryBuilder = this.paymentRepository.createQueryBuilder('payment').orderBy('payment.id', options.sort);
    if (options.userId) queryBuilder.where('payment.userId = :userId', { userId: options.userId });

    if (options.search) {
      queryBuilder.andWhere(
        `(
            CAST(payment.orderId as CHAR) LIKE :search 
            OR CAST(payment.amount as CHAR) LIKE :search 
            OR CAST(payment.createdAt as CHAR) LIKE :search 
            OR payment.status LIKE :search 
            OR payment.paymentMethod LIKE :search
        )`,
        { search: `%${options.search}%` },
      );
    }

    queryBuilder.leftJoinAndMapOne('payment.user', User, 'user', 'user.id = payment.userId');

    const pagination = new Pagination(queryBuilder);
    return pagination.paginate(options.page, options.limit);
  }

  async getByOrderId(orderId: number) {
    const records = await this.paymentRepository.find({ where: { orderId } });
    if (!records) throw new NotFoundException();
    return records;
  }

  async cancel(paymentId: number) {
    const payment = await this.getById(paymentId);
    payment.status = EPaymentStatus.CANCELLED;
    await this.update(payment.id, payment);
  }
}
