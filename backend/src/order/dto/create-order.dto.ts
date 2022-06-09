import { Type } from 'class-transformer';
import { IsString, Length, ValidateNested } from 'class-validator';
import { Cart } from '../../cart/entities/cart.entity';

export class CreateOrderDto {
  @ValidateNested()
  @Type(() => Cart)
  cart: Cart;

  @IsString()
  @Length(10, 255)
  shippingAddress: string;
}
