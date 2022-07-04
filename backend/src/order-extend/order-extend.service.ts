import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { OrderItem } from '../order/entities/order.entity';
import { EOrderStatus } from '../order/order-status.enum';
import { OrderService } from '../order/order.service';
import { Payment } from '../payment/entities/payment.entity';
import { EPaymentStatus } from '../payment/payment-status.enum';
import { PaymentService } from '../payment/payment.service';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { IOrderPopulateOptions, IOrderType, IPopulatedOrder } from './order-extend.interface';

@Injectable()
export class OrderExtendService {
  private readonly logger = new Logger('OrderExtendService');

  constructor(
    // service
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
    private readonly paymentService: PaymentService,
    private readonly userService: UserService,
    // datasource
    private readonly dataSource: DataSource,
  ) {}

  // revert product stock function
  private async revertProductStock(productService: ProductService, queryRunner: QueryRunner, item: OrderItem) {
    const product = await productService.findOne(item.productId);
    product.stock = product.stock + item.quantity;
    await queryRunner.manager.save(product);
  }

  // cancel payment function
  private async cancelPayment(queryRunner: QueryRunner, payment: Payment) {
    payment.status = EPaymentStatus.CANCELLED;
    await queryRunner.manager.save(payment);
  }

  async cancel(orderId: number) {
    // get order
    const order = await this.orderService.findOne(orderId);

    // if order is already cancelled then throw exception
    if (order.status === EOrderStatus.CANCELLED) {
      throw new BadRequestException();
    }
    // only created and pending order can be cancelled
    if (order.status !== EOrderStatus.CREATED && order.status !== EOrderStatus.PENDING) {
      throw new BadRequestException();
    }

    // start transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // update order status
      order.status = EOrderStatus.CANCELLED;
      await queryRunner.manager.save(order);

      // revert product stock
      await Promise.all(
        order.orderItems.map((item) => this.revertProductStock(this.productService, queryRunner, item)),
      );

      // get all payments
      const payments = await this.paymentService.getByOrderId(order.id);
      // cancel all payments
      await Promise.all(payments.map((payment) => this.cancelPayment(queryRunner, payment)));

      // commit transaction
      await queryRunner.commitTransaction();
    } catch (err: any) {
      // log error
      this.logger.error(err);
      this.logger.error(err.stack);
      // rollback transaction
      await queryRunner.rollbackTransaction();
      // throw error
      throw new InternalServerErrorException();
    } finally {
      // release query runner
      await queryRunner.release();
    }
  }

  async populateOrder(order: IOrderType, options: IOrderPopulateOptions) {
    let populatedOrder: IPopulatedOrder;
    if (options.user) {
      const user = await this.userService.findOne((<any>order).userId);
      populatedOrder = { ...order, user };
    }
    if (options.payment) {
      const payments = await this.paymentService.getByOrderId(order.id);
      populatedOrder = { ...order, payments };
    }
    return populatedOrder;
  }
}
