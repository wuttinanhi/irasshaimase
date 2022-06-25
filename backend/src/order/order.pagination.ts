import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { PaginationOptions } from '../pagination/pagination.options';
import { EOrderStatus } from './order-status.enum';

export class OrderPaginationOptions extends PaginationOptions {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsEnum(EOrderStatus)
  status?: EOrderStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
