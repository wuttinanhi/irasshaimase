import type { ICart } from "../cart/cart.interface";
import type { EOrderStatus } from "../enum/order-status.enum";
import { BaseAPI, IAPIError } from "./base.api";
import type { INotAvailableProductResponse } from "./cart.api";
import type { IPayment } from "./payment.api";
import type { IUser } from "./user.api";

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
  user?: IUser;
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
  payments: IPayment[];
}

export interface IOrderPaginateOptions {
  page?: number;
  limit?: number;
  search?: string;
  status?: EOrderStatus;
  sort?: "ASC" | "DESC";
  admin?: boolean;
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

    try {
      const response = await this.send(url, "POST", body);
      return response.data as IOrderCreateResponse;
    } catch (error) {
      if (error instanceof IAPIError && error.status === 422) {
        const data = error.data as INotAvailableProductResponse;
        throw data;
      }
    }
  }

  async paginate(options: IOrderPaginateOptions) {
    // parse options
    const params: any = { page: options.page, limit: options.limit };
    if (!options.page || options.page <= 0) {
      params.page = 1;
    }
    if (!options.limit || options.limit <= 0 || options.limit >= 50) {
      params.limit = 50;
    }
    if (options.search) {
      params.search = options.search;
    }
    if (options.status) {
      params.status = options.status;
    }
    if (!options.sort) {
      params.sort = "DESC";
    }

    // send request
    let url = `api/order/paginate?${new URLSearchParams(params)}`;
    if (options.admin) {
      url = `api/order/admin/paginate?${new URLSearchParams(params)}`;
    }
    const result = await this.send(url, "GET");
    return result.data as IOrderPaginationResult;
  }

  async report(orderId: number) {
    const url = `api/order/report?id=${orderId}`;
    const result = await this.send(url, "GET");
    return result.data as IOrderReport;
  }

  async cancel(orderId: number) {
    const url = `api/order/cancel?id=${orderId}`;
    await this.send(url, "POST");
  }
}
