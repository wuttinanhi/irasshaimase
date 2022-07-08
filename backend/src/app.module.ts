import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CronjobModule } from './cronjob/cronjob.module';
import { OrderExtendModule } from './order-extend/order-extend.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { PaypalModule } from './paypal/paypal.module';
import { PdfMakerModule } from './pdf-maker/pdf-maker.module';
import { ProductImageModule } from './product-image/product-image.module';
import { ProductModule } from './product/product.module';
import { ThrottlerBehindProxyGuard } from './rate-limit/throttler-behind-proxy.guard';
import { ReceiptModule } from './receipt/receipt.module';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';
import { UserRoleModule } from './user-role/user-role.module';
import { UserModule } from './user/user.module';

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
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
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
    OrderExtendModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerBehindProxyGuard }],
})
export class AppModule {}
