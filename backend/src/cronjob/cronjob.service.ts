import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderExtendService } from '../order-extend/order-extend.service';
import { OrderService } from '../order/order.service';
import { ReceiptService } from '../receipt/receipt.service';

@Injectable()
export class CronjobService {
  private readonly logger = new Logger(CronjobService.name);

  constructor(
    private readonly orderService: OrderService,
    private readonly orderExtendService: OrderExtendService,
    private readonly receiptService: ReceiptService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async cancelTimeoutOrder() {
    const timeoutOrder = await this.orderService.getPaymentTimeoutOrder();
    for (const order of timeoutOrder) {
      this.logger.warn(`Canceling order #${order.id}`);
      await this.orderExtendService.cancel(order.id);
    }
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async cleanReceiptFile() {
    await this.receiptService.cleanReceiptFile();
  }
}
