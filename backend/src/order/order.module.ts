import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from '../cart/cart.module';
import { ProductModule } from '../product/product.module';
import { ShippingAddressModule } from '../shipping-address/shipping-address.module';
import { Order, OrderItem } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), ProductModule, CartModule, ShippingAddressModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService, TypeOrmModule],
})
export class OrderModule {}
