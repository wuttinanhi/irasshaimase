import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm/data-source/DataSource';
import { CartService } from '../cart/cart.service';
import { ProductService } from '../product/product.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderItem } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    // repository
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    // service
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    // datasource
    private readonly dataSource: DataSource,
  ) {}

  findOne(id: number) {
    return this.orderRepository.findOne({ where: { id } });
  }

  async create(createOrderDto: CreateOrderDto) {
    // validate cart
    const cartValidate = await this.cartService.validateCart(
      createOrderDto.cart,
    );

    // if cart is invalid, throw exception
    if (cartValidate.notAvailableCount > 0) {
      throw new UnprocessableEntityException(cartValidate);
    }

    // start transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // create order
      const order = this.orderRepository.create();
      order.userId = createOrderDto.userId;
      order.orderItems = [];
      await queryRunner.manager.save(order);

      // loop through cart item
      for (const item of createOrderDto.cart.items) {
        // create order item
        const orderItem = this.orderItemRepository.create();
        const product = await this.productService.findOne(item.productId);
        orderItem.orderId = order.id;
        orderItem.productId = product.id;
        orderItem.quantity = item.quantity;
        orderItem.price = product.price * item.quantity;

        // remove product stock
        product.stock = product.stock - item.quantity;
        await queryRunner.manager.save(product);

        // save order item
        await queryRunner.manager.save(orderItem);

        // push order item to order
        order.orderItems.push(orderItem);
      }

      // save order
      const orderResult = await queryRunner.manager.save(order);

      // commit transaction
      await queryRunner.commitTransaction();

      // return order result
      return orderResult;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();

      // throw error
      throw new InternalServerErrorException();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
}
