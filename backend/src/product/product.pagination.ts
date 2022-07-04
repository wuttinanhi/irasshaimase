import { IsOptional, IsString } from 'class-validator';
import { PaginationOptions } from '../pagination/pagination.options';

export class ProductPaginationOptions extends PaginationOptions {
  @IsOptional()
  @IsString()
  search?: string;
}
