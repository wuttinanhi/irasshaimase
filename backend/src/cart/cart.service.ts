import { Injectable } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { Cart, CartItem } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(private readonly productService: ProductService) {}

  private async validateCartItem(cartItem: CartItem) {
    const { productId, quantity } = cartItem;
    const available = await this.productService.isProductAvailable(
      productId,
      quantity,
    );
    return available ? null : productId;
  }

  public async validateCart(cart: Cart) {
    const items = cart.items;

    const notAvailablePromises: Promise<number>[] = items.map((item) =>
      this.validateCartItem(item),
    );

    const notAvailableResult = await Promise.all(notAvailablePromises);

    // filter null
    const notAvailable = notAvailableResult.filter((id) => id !== null);

    return {
      notAvailableCount: notAvailable.length,
      notAvailableProductId: notAvailable,
    };
  }
}
