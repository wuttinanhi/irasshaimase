import { IsNumber, IsPositive } from 'class-validator';
import { IPaginationOptions } from '../pagination/pagination-options.interface';

export class IPaymentPaginationOptions extends IPaginationOptions {
  @IsPositive()
  @IsNumber()
  userId: number;

  // TODO: Need Implementation
  //   orderId: number;
  //   amount: number;
  //   status: EPaymentStatus;
  //   paymentMethod: EPaymentMethod;
}
