import { BaseAPI } from "./base.api";

export interface IPaymentSuccessResult {
  orderId: number;
}

export interface IPayResult {
  payUrl: string;
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
}
