import { BaseAPI } from "./base.api";

export interface IPayResult {
  payUrl: string;
}

export class PaymentAPI extends BaseAPI {
  async pay(orderId: number) {
    const url = `api/payment/pay`;
    const body = { orderId };
    const result = await this.send(url, "POST", body);
    return result.data as IPayResult;
  }
}
