import { Module } from '@nestjs/common';
import { OrderModule } from '../order/order.module';
import { PaypalModule } from '../paypal/paypal.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [OrderModule, PaypalModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
