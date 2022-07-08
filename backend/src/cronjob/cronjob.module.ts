import { Module } from '@nestjs/common';
import { OrderExtendModule } from '../order-extend/order-extend.module';
import { OrderModule } from '../order/order.module';
import { ReceiptModule } from '../receipt/receipt.module';
import { CronjobService } from './cronjob.service';

@Module({
  imports: [OrderModule, OrderExtendModule, ReceiptModule],
  providers: [CronjobService],
})
export class CronjobModule {}
