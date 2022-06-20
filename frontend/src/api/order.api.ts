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

export interface IPaginateMeta {
  currentPage: number;
  totalItemsInPage: number;
  totalItems: number;
  totalPages: number;
}

export interface IOrderPaginationResult {
  items: IOrder[];
  meta: IPaginateMeta;
}

export interface IOrderReport {
  id: number;
  createdAt: Date;
  userId: number;
  total: number;
  status: string;
  orderItems: IOrderReportItem[];
}

export interface IOrderReportItem {
  id: string;
  name: string;
  price: string;
  description: string;
  quantity: string;
  image: null | string;
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

  async paginate(page: number, limit = 50) {
    const url = `api/order/paginate?page=${page}&limit=${limit}`;
    const result = await this.send(url, "GET");
    return result.data as IOrderPaginationResult;
  }

  async report(orderId: number) {
    const url = `api/order/report?id=${orderId}`;
    const result = await this.send(url, "GET");
    return result.data as IOrderReport;
  }
}
