import { Module } from '@nestjs/common';
import { OrderModule } from '../order/order.module';
import { PaymentModule } from '../payment/payment.module';
import { PdfMakerModule } from '../pdf-maker/pdf-maker.module';
import { UserModule } from '../user/user.module';
import { ReceiptController } from './receipt.controller';
import { ReceiptService } from './receipt.service';

@Module({
  imports: [OrderModule, PdfMakerModule, PaymentModule, UserModule],
  controllers: [ReceiptController],
  providers: [ReceiptService],
  exports: [ReceiptService],
})
export class ReceiptModule {}
