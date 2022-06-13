import type { ICart } from "../cart/ICart";
import { BaseAPI } from "./base.api";

export interface IOrderItem {
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  id: number;
}

export interface IOrder {
  userId: number;
  orderItems: IOrderItem[];
  total: number;
  status: string;
  id: number;
  createdAt: Date;
}

export interface IOrderCreateResponse {
  order: IOrder;
  payUrl: string;
}

export class OrderAPI extends BaseAPI {
  async createOrder(cart: ICart) {
    if (cart.items.length <= 0) return null;
    const url = `api/order/create`;

    const body: any = {};
    body.shippingAddress = "TODO: NEED TO IMPLEMENT";
    body.cart = {};
    body.cart.items = [];
    cart.items.forEach((item) => {
      body.cart.items.push({
        productId: item.product.id,
        quantity: item.quantity,
      });
    });

    const response = await this.get(url, "POST", body);
    return response as IOrderCreateResponse;
  }
}
