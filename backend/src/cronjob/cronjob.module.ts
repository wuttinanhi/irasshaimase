import { Module } from '@nestjs/common';
import { OrderModule } from '../order/order.module';
import { CronjobService } from './cronjob.service';

@Module({
  imports: [OrderModule],
  providers: [CronjobService],
})
export class CronjobModule {}
