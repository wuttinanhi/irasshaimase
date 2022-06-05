import { Type } from 'class-transformer';
import { IsNumber, IsPositive, ValidateNested } from 'class-validator';
import { Cart } from '../../cart/entities/cart.entity';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  userId: number;

  @ValidateNested()
  @Type(() => Cart)
  cart: Cart;
}
