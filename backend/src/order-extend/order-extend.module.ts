import { Module } from '@nestjs/common';
import { OrderModule } from '../order/order.module';
import { PaymentModule } from '../payment/payment.module';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { OrderExtendController } from './order-extend.controller';
import { OrderExtendService } from './order-extend.service';

@Module({
  imports: [OrderModule, ProductModule, PaymentModule, UserModule],
  controllers: [OrderExtendController],
  providers: [OrderExtendService],
  exports: [OrderExtendService],
})
export class OrderExtendModule {}
