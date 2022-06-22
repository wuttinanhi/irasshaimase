import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EOrderStatus } from '../order/order-status.enum';
import { OrderService } from '../order/order.service';
import { Pagination } from '../pagination/pagination';
import { PaypalService } from '../paypal/paypal.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { IPaymentPaginationOptions } from './payment-pagination.interface';
import { EPaymentStatus } from './payment-status.enum';

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

  async paginate(options: IPaymentPaginationOptions) {
    const queryBuilder = this.paymentRepository.createQueryBuilder('payment').orderBy('id', options.sort);
    if (options.userId) queryBuilder.where('payment.userId = :userId', { userId: options.userId });

    const pagination = new Pagination(queryBuilder);
    return pagination.paginate(options.page, options.limit);
  }
}
