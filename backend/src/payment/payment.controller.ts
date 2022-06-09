import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EOrderStatus } from '../order/order-status.enum';
import { OrderService } from '../order/order.service';
import { PaypalService } from '../paypal/paypal.service';
import { AdminGuard } from '../user-role/admin.guard';

@Controller('api/payment')
export class PaymentController {
  constructor(
    private readonly paypalService: PaypalService,
    private readonly orderService: OrderService,
  ) {}

  @Get('success')
  async success(@Query('token') token: string) {
    // get authorization info
    const { authorizationId, orderId } =
      await this.paypalService.getAuthorizationInfo(token);

    // capture payment
    const captureId = await this.paypalService.capture(authorizationId);

    // get order to update
    const order = await this.orderService.findOne(orderId);

    // update order status to paid, order authorization id and capture id
    order.status = EOrderStatus.PAID;
    order.authorizationId = authorizationId;
    order.captureId = captureId;

    // update order
    await this.orderService.update(orderId, order);

    // return order id
    return { orderId };
  }

  @Post('refund')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async refund(@Query('orderId') orderId: number) {
    const order = await this.orderService.findOne(orderId);
    await this.paypalService.refund(order.id, order.captureId, order.total);
    order.status = EOrderStatus.REFUNDED;
    await this.orderService.update(orderId, order);
    return { orderId };
  }

  @Get('cancel')
  async cancel() {
    return 'cancelled';
  }
}
