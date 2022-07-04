import { Module } from '@nestjs/common';
import { OrderExtendModule } from '../order-extend/order-extend.module';
import { OrderModule } from '../order/order.module';
import { CronjobService } from './cronjob.service';

@Module({
  imports: [OrderModule, OrderExtendModule],
  providers: [CronjobService],
})
export class CronjobModule {}
