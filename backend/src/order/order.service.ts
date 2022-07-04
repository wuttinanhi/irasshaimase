import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm/data-source/DataSource';
import { CartService } from '../cart/cart.service';
import { Pagination } from '../pagination/pagination';
import { ProductService } from '../product/product.service';
import { ShippingAddressService } from '../shipping-address/shipping-address.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderItem } from './entities/order.entity';
import { EOrderStatus } from './order-status.enum';
import { IOrderReport } from './order.interface';
import { OrderPaginationOptions } from './order.pagination';

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
    private readonly shippingAddressService: ShippingAddressService,
    private readonly configService: ConfigService,
    // datasource
    private readonly dataSource: DataSource,
  ) {}

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException();
    return order;
  }

  async create(userId: any, dto: CreateOrderDto) {
    // validate cart
    const cartValidate = await this.cartService.validateCart(dto.cart);

    // if cart is invalid, throw exception
    if (cartValidate.notAvailableCount > 0) {
      throw new UnprocessableEntityException(cartValidate);
    }

    // start transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // get shipping address
      const shippingAddressRecord = await this.shippingAddressService.getById(dto.shippingAddressId);
      const shippingAddressData = shippingAddressRecord.toHumanReadable();

      // create order
      const order = this.orderRepository.create();
      order.userId = userId;
      order.orderItems = [];
      order.total = 0;
      order.status = EOrderStatus.CREATED;
      order.shippingAddress = shippingAddressData;
      await queryRunner.manager.save(order);

      // loop through cart item
      for (const item of dto.cart.items) {
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

        // update total
        order.total += orderItem.price;
      }

      // update order status
      order.status = EOrderStatus.PENDING;

      // save order
      const createdOrder = await queryRunner.manager.save(order);

      // commit transaction
      await queryRunner.commitTransaction();

      // return result
      return {
        order: createdOrder,
      };
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

  async update(id: number, order: Order) {
    const original = await this.findOne(id);
    return this.orderRepository.save({ ...original, ...order });
  }

  async updateOrderStatus(id: number, status: EOrderStatus) {
    const order = await this.findOne(id);
    order.status = status;
    await this.update(id, order);
  }

  async paginate(options: OrderPaginationOptions) {
    const queryBuilder = this.orderRepository.createQueryBuilder('order').orderBy('id', options.sort);

    if (options.userId) queryBuilder.where('order.userId = :userId', { userId: options.userId });
    if (options.status) queryBuilder.andWhere('order.status = :status', { status: options.status });

    if (options.search) {
      queryBuilder.andWhere(
        `(
          CAST(order.id as CHAR) LIKE :search OR 
          CAST(order.createdAt as CHAR) LIKE :search OR 
          order.status LIKE :search OR 
          order.shippingAddress LIKE :search
        )`,
        { search: `%${options.search}%` },
      );
    }

    const pagination = new Pagination(queryBuilder);
    const pageResult = await pagination.paginate(options.page, options.limit);

    const populatedOrder = await Promise.all(pageResult.items.map((v) => this.report(v.id)));
    pageResult.items = <any>populatedOrder;

    return pageResult;
  }

  async report(orderId: number) {
    const order = await this.findOne(orderId);

    const queryBuilder = this.orderItemRepository.createQueryBuilder('order_item');
    queryBuilder.select([
      'ANY_VALUE(product.id) as id',
      'ANY_VALUE(product.name) as name',
      'ANY_VALUE(order_item.price) as price',
      'ANY_VALUE(product.description) as description',
      'ANY_VALUE(order_item.quantity) as quantity',
      'ANY_VALUE(product_image.imageUrl) as image',
    ]);

    queryBuilder.leftJoin('product', 'product', 'product.id = order_item.productId');
    queryBuilder.leftJoin('product_image', 'product_image', 'product_image.productId = product.id');

    queryBuilder.where('order_item.orderId = :orderId', { orderId: order.id });
    queryBuilder.groupBy('order_item.productId');

    order.orderItems = await queryBuilder.getRawMany();

    return order as IOrderReport;
  }

  async getPaymentTimeoutOrder() {
    const PAYMENT_TIMEOUT_DURATION: number = this.configService.get('ORDER_PAYMENT_TIMEOUT');

    const queryBuilder = this.orderRepository.createQueryBuilder('order');
    queryBuilder.where('order.status = :status', { status: EOrderStatus.PENDING });
    queryBuilder.andWhere('TIMESTAMPDIFF(SECOND,order.createdAt,NOW())  >= :timeout', {
      timeout: PAYMENT_TIMEOUT_DURATION,
    });

    return queryBuilder.getMany();
  }
}
