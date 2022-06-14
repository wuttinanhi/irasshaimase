import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EOrderStatus } from '../order-status.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  userId: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.orderId, { eager: true })
  orderItems: OrderItem[];

  @Column()
  total: number;

  @Column({ type: 'enum', enum: EOrderStatus, default: EOrderStatus.CREATED })
  status: EOrderStatus;

  @Column()
  @Exclude()
  shippingAddress: string;
}

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  orderId: number;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column()
  price: number;
}
