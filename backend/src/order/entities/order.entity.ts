import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: 1 })
  userId: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.orderId)
  orderItems: OrderItem[];
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
