import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { PaginationOptions } from '../pagination/pagination.options';

export class PaymentPaginationOptions extends PaginationOptions {
  @IsPositive()
  @IsNumber()
  @IsOptional()
  userId: number;

  @IsOptional()
  @IsString()
  search?: string;
}
