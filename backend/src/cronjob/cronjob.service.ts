import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderService } from '../order/order.service';

@Injectable()
export class CronjobService {
  private readonly logger = new Logger(CronjobService.name);

  constructor(private readonly orderService: OrderService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async cancelTimeoutOrder() {
    const timeoutOrder = await this.orderService.getPaymentTimeoutOrder();
    for (const order of timeoutOrder) {
      this.logger.warn(`Canceling order #${order.id}`);
      await this.orderService.cancel(order.id);
    }
  }
}
