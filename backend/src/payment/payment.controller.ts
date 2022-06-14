import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EOrderStatus } from '../order/order-status.enum';
import { OrderService } from '../order/order.service';
import { PaypalService } from '../paypal/paypal.service';
import { AdminGuard } from '../user-role/admin.guard';
import { User } from '../user/entities/user.entity';
import { EPaymentMethod } from './payment-method.enum';
import { EPaymentStatus } from './payment-status.enum';
import { PaymentService } from './payment.service';

@Controller('api/payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly paypalService: PaypalService,
    private readonly orderService: OrderService,
  ) {}

  @Get('success')
  async success(@Query('token') token: string) {
    // get authorization info
    const { paymentId, authorizationId, orderId } = await this.paypalService.requestCapture(token);

    // capture payment
    const captureId = await this.paypalService.capture(authorizationId);

    // update order status
    const order = await this.orderService.findOne(orderId);
    order.status = EOrderStatus.PAID;
    await this.orderService.update(orderId, order);

    // update payment record
    const payment = await this.paymentService.getByPaypalPaymentId(paymentId);
    payment.authorizationId = authorizationId;
    payment.captureId = captureId;
    payment.status = EPaymentStatus.PAID;
    await this.paymentService.update(payment.id, payment);

    // return order id
    return { orderId };
  }

  @Get('cancel')
  async cancel() {
    return 'cancelled';
  }

  @Post('pay')
  @UseGuards(JwtAuthGuard)
  async pay(@Body('orderId') orderId: number, @CurrentUser() user: User) {
    // get order by id
    const order = await this.orderService.findOne(orderId);

    // get pay url
    const paypalResult = await this.paypalService.create(order);

    // create payment record
    await this.paymentService.create({
      amount: order.total,
      orderId: order.id,
      paymentMethod: EPaymentMethod.PAYPAL,
      userId: user.id,
      paypalPaymentId: paypalResult.id,
    });

    // return pay url
    return {
      payUrl: paypalResult.payUrl,
    };
  }

  @Post('admin/refund')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async refund(@Body('orderId') orderId: number) {
    await this.paymentService.refund(orderId);
  }
}
