import { BaseAPI } from "./base.api";
import type { IUser } from "./user.api";

export interface IPaymentSuccessResult {
  orderId: number;
}

export interface IPayResult {
  payUrl: string;
}

export interface IPayment {
  id: number;
  userId: number;
  orderId: number;
  amount: number;
  status: string;
  createdAt: Date;
  paymentMethod: string;
  user: IUser;
}

export interface IPaymentPaginationMeta {
  currentPage: number;
  totalItemsInPage: number;
  totalItems: number;
  totalPages: number;
}

export interface IPaymentPaginationResult {
  items: IPayment[];
  meta: IPaymentPaginationMeta;
}

export interface IOrderPaginateOptions {
  search?: string;
  page?: number;
  limit?: number;
  sort?: "ASC" | "DESC";
  admin?: boolean;
}

export class PaymentAPI extends BaseAPI {
  public async success(token: string) {
    const result = await this.send(`api/payment/success?token=${token}`);
    return result.data as IPaymentSuccessResult;
  }

  public async pay(orderId: number) {
    const url = `api/payment/pay`;
    const body = { orderId: orderId };

    const response = await this.send(url, "POST", body);
    if (response.status !== 201) throw new Error("failed to pay order");

    return response.data as IPayResult;
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
    if (!options.sort) {
      params.sort = "DESC";
    }

    // send request
    let url = `api/payment/paginate?${new URLSearchParams(params)}`;
    if (options.admin) {
      `api/payment/admin/paginate?${new URLSearchParams(params)}`;
    }
    const result = await this.send(url, "GET");
    return result.data as IPaymentPaginationResult;
  }
}
