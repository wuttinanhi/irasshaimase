import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { EOrderStatus } from '../order/order-status.enum';
import { OrderService } from '../order/order.service';
import { PaypalService } from '../paypal/paypal.service';

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
    const capture = await this.paypalService.capture(authorizationId);
    if (capture === false) throw new InternalServerErrorException();

    // update order status to paid
    await this.orderService.updateOrderStatus(orderId, EOrderStatus.PAID);

    // return order id
    return { orderId };
  }

  @Get('cancel')
  async cancel() {
    return 'cancelled';
  }
}
