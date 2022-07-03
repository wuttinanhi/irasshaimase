import { Injectable } from '@nestjs/common';
import { Product } from '../product/entities/product.entity';
import { ProductService } from '../product/product.service';
import { Cart, CartItem } from './entities/cart.entity';

export class ValidateProduct extends Product {
  requestedQuantity: number;
  available: boolean;
}

@Injectable()
export class CartService {
  constructor(private readonly productService: ProductService) {}

  private async validateCartItem(cartItem: CartItem) {
    const { productId, quantity } = cartItem;
    const product = await this.productService.findOne(productId);
    const available = await this.productService.isProductAvailable(product.id, quantity);
    const validateObject: ValidateProduct = product as any;
    validateObject.available = available;
    validateObject.requestedQuantity = quantity;
    return validateObject;
  }

  public async validateCart(cart: Cart) {
    // remove duplicates items
    const items = cart.items.filter((item, index) => {
      return cart.items.findIndex((i) => i.productId === item.productId) === index;
    });

    // validate each item
    const checkPromises = items.map((item) => this.validateCartItem(item));
    const checkResult = await Promise.all(checkPromises);

    // not available product list
    const notAvailableList = checkResult.filter((id) => id.available === false);
    // get not available count
    const notAvailableCount = notAvailableList.length;
    // not available product id list
    const notAvailableProductIds = notAvailableList.map((v) => v.id);

    return {
      notAvailableProductIds: notAvailableProductIds,
      notAvailableCount: notAvailableCount,
      products: checkResult,
    };
  }
}
