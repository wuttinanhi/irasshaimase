import { IsNumber, IsPositive } from 'class-validator';
import { PaginationOptions } from '../pagination/pagination.options';

export class PaymentPaginationOptions extends PaginationOptions {
  @IsPositive()
  @IsNumber()
  userId: number;

  // TODO: Need Implementation
  //   orderId: number;
  //   amount: number;
  //   status: EPaymentStatus;
  //   paymentMethod: EPaymentMethod;
}
