import { IsIn, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class IPaginationOptions {
  @IsPositive()
  @IsNumber()
  page: number;

  @IsPositive()
  @IsNumber()
  limit: number;

  @IsString()
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  sort: 'ASC' | 'DESC' = 'DESC';
}
