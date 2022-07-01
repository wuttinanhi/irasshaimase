import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { PaypalModule } from './paypal/paypal.module';
import { ProductImageModule } from './product-image/product-image.module';
import { ProductModule } from './product/product.module';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';
import { UserRoleModule } from './user-role/user-role.module';
import { UserModule } from './user/user.module';
import { CronjobModule } from './cronjob/cronjob.module';
import { PdfMakerModule } from './pdf-maker/pdf-maker.module';
import { ReceiptModule } from './receipt/receipt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'images', 'products'),
      serveRoot: '/images/products',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'public'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProductModule,
    UserModule,
    AuthModule,
    CartModule,
    OrderModule,
    PaymentModule,
    PaypalModule,
    UserRoleModule,
    ProductImageModule,
    ShippingAddressModule,
    ScheduleModule.forRoot(),
    CronjobModule,
    PdfMakerModule,
    ReceiptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
