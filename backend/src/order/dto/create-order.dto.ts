import { Type } from 'class-transformer';
import { IsNumber, IsPositive, ValidateNested } from 'class-validator';
import { Cart } from '../../cart/entities/cart.entity';

export class CreateOrderDto {
  @ValidateNested()
  @Type(() => Cart)
  cart: Cart;

  @IsNumber()
  @IsPositive()
  shippingAddressId: number;
}
