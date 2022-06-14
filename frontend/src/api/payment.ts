import { BaseAPI } from "./base.api";

export interface IPaymentSuccessResult {
  orderId: number;
}

export class PaymentAPI extends BaseAPI {
  constructor() {
    super();
  }

  public async success(token: string) {
    const result = await this.get(`api/payment/success?token=${token}`);
    return result as IPaymentSuccessResult;
  }
}
