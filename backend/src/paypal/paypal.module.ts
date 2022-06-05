import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { PaypalController } from './paypal.controller';
import { PaypalService } from './paypal.service';

@Module({
  imports: [ProductModule],
  controllers: [PaypalController],
  providers: [PaypalService],
  exports: [PaypalService],
})
export class PaypalModule {}
