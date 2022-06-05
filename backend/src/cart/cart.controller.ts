import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartValidateDto } from './dto/cart-validate.dto';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('validate')
  validate(@Body() dto: CartValidateDto) {
    return this.cartService.validateCart(dto);
  }
}
