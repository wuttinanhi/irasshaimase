import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
    ProductModule,
    UserModule,
    AuthModule,
    CartModule,
    OrderModule,
    PaymentModule,
    PaypalModule,
    UserRoleModule,
    ProductImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
