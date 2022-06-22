import type { ICart } from "../cart/cart.interface";
import { BaseAPI } from "./base.api";

export interface ICartValidateProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  available: boolean;
  requestedQuantity: number;
}

export interface ICartValidateResponse {
  notAvailableProductIds: number[];
  notAvailableCount: number;
  products: ICartValidateProduct[];
}

export class CartAPI extends BaseAPI {
  async validate(cart: ICart) {
    const url = `api/cart/validate`;

    const body: any = {};
    body.items = [];
    cart.items.forEach((item) => {
      body.items.push({
        productId: item.product.id,
        quantity: item.quantity,
      });
    });

    if (body.items.length <= 0) {
      console.log("No cart validate because cart is empty");
      return null;
    }

    const response = await this.get(url, "POST", body);
    return response as ICartValidateResponse;
  }
}
