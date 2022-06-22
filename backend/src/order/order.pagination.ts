import { IsNumber, IsPositive } from 'class-validator';
import { IPaginationOptions } from '../pagination/pagination-options.interface';

export class OrderPaginationOptions extends IPaginationOptions {
  @IsPositive()
  @IsNumber()
  userId: number;
}
