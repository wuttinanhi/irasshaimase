import { IsNumber, IsPositive } from 'class-validator';
import { PaginationOptions } from '../pagination/pagination.options';

export class OrderPaginationOptions extends PaginationOptions {
  @IsPositive()
  @IsNumber()
  userId: number;
}
