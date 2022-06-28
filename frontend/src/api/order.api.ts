import type { ICart } from "../cart/cart.interface";
import { BaseAPI } from "./base.api";

export interface IOrderItem {
  id: number;
  orderId?: number;
  productId?: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  image: null | string;
}

export interface IOrder {
  id: number;
  userId: number;
  orderItems: IOrderItem[];
  total: number;
  status: string;
  createdAt: Date;
  shippingAddress: string;
}

export interface IOrderCreateResponse {
  order: IOrder;
}

export interface IOrderPaginationMeta {
  currentPage: number;
  totalItemsInPage: number;
  totalItems: number;
  totalPages: number;
}

export interface IOrderPaginationResult {
  items: IOrder[];
  meta: IOrderPaginationMeta;
}

export interface IOrderReport {
  id: number;
  userId: number;
  total: number;
  status: string;
  createdAt: Date;
  shippingAddress: string;
  orderItems: IOrderItem[];
}

export class OrderAPI extends BaseAPI {
  async createOrder(cart: ICart) {
    if (cart.items.length <= 0) return null;
    const url = `api/order/create`;

    const body: any = {};

    body.shippingAddressId = cart.shippingAddressId;
    body.cart = {};
    body.cart.items = [];

    cart.items.forEach((item) => {
      body.cart.items.push({
        productId: item.product.id,
        quantity: item.quantity,
      });
    });

    const response = await this.send(url, "POST", body);

    if (response.status !== 201) throw new Error("failed to create order");

    return response.data as IOrderCreateResponse;
  }

  async paginate(page: number, limit = 50, search?: string) {
    const params: any = { page: page, limit: limit };
    if (search) params.search = search;

    const url = `api/order/paginate?${new URLSearchParams(params)}`;
    const result = await this.send(url, "GET");
    return result.data as IOrderPaginationResult;
  }

  async report(orderId: number) {
    const url = `api/order/report?id=${orderId}`;
    const result = await this.send(url, "GET");
    return result.data as IOrderReport;
  }
}
