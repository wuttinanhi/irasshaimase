import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EPaymentMethod } from '../payment-method.enum';
import { EPaymentStatus } from '../payment-status.enum';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  orderId: number;

  @Column()
  amount: number;

  @Column({ type: 'enum', enum: EPaymentStatus, default: EPaymentStatus.CREATED })
  status: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'enum', enum: EPaymentMethod, default: EPaymentMethod.PAYPAL })
  paymentMethod: string;

  @Exclude()
  @Column()
  paypalPaymentId: string;

  @Exclude()
  @Column({ default: null })
  captureId: string;

  @Exclude()
  @Column({ default: null })
  authorizationId: string;
}
