import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, IsNumber, IsPositive, ValidateNested } from 'class-validator';

export class Cart {
  @IsArray()
  @Type(() => CartItem)
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  items: CartItem[];
}

export class CartItem {
  @IsNumber()
  @IsPositive()
  productId: number;

  @IsNumber()
  @IsPositive()
  @IsInt()
  quantity: number;
}
