import { Injectable } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk';
import { Order } from '../order/entities/order.entity';
import { ProductService } from '../product/product.service';

@Injectable()
export class PaypalService {
  constructor(private readonly productService: ProductService) {}

  private getClient(): paypal.core.PayPalHttpClient {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    const environment = new paypal.core.SandboxEnvironment(
      clientId,
      clientSecret,
    );

    const client = new paypal.core.PayPalHttpClient(environment);
    return client;
  }

  public async create(order: Order) {
    const request = new paypal.orders.OrdersCreateRequest();

    // create items list
    const items: paypal.orders.Item[] = [];
    for (const item of order.orderItems) {
      const product = await this.productService.findOne(item.productId);

      const paypaylItem: paypal.orders.Item = {
        name: product.name,
        description: product.description,
        quantity: String(item.quantity),
        unit_amount: { currency_code: 'USD', value: String(product.price) },
        category: <any>'DIGITAL_GOODS',
      };

      items.push(paypaylItem);
    }

    // build request body
    request.requestBody({
      intent: 'AUTHORIZE',
      application_context: {
        return_url: 'http://localhost:3000/api/payment/success',
        cancel_url: 'http://localhost:3000/api/payment/cancel',
      },
      purchase_units: [
        {
          invoice_id: String(order.id),
          items: items,
          amount: {
            currency_code: 'USD',
            value: String(order.total),
            breakdown: {
              item_total: { currency_code: 'USD', value: String(order.total) },
              discount: { currency_code: 'USD', value: '0.00' },
              handling: { currency_code: 'USD', value: '0.00' },
              shipping: { currency_code: 'USD', value: '0.00' },
              tax_total: { currency_code: 'USD', value: '0.00' },
              shipping_discount: { currency_code: 'USD', value: '0.00' },
              insurance: { currency_code: 'USD', value: '0.00' },
            },
          },
        },
      ],
    });

    // execute request
    const response = await this.getClient().execute(request);

    // return data
    return {
      payUrl: response.result.links[1].href,
    };
  }

  public async getAuthorizationInfo(token: string) {
    const orderAuthRequest = new paypal.orders.OrdersAuthorizeRequest(token);
    const orderAuthResponse = await this.getClient().execute(orderAuthRequest);

    const authorizationId =
      orderAuthResponse.result.purchase_units[0].payments.authorizations[0].id;

    const orderId =
      orderAuthResponse.result.purchase_units[0].payments.authorizations[0]
        .invoice_id;

    return { authorizationId, orderId };
  }

  public async capture(authorizationId: string): Promise<any> {
    try {
      const captureRequest = new paypal.payments.AuthorizationsCaptureRequest(
        authorizationId,
      );

      await this.getClient().execute(captureRequest);

      return true;
    } catch (error) {
      false;
    }
  }

  public async refund(captureId: string): Promise<any> {
    const Refundrequest = new paypal.payments.CapturesRefundRequest(captureId);

    Refundrequest.requestBody({
      amount: {
        currency_code: 'USD',
        value: '10.00',
      },
      note_to_payer: 'REFUND',
      invoice_id: captureId,
    });

    const refundResponse = await this.getClient().execute(Refundrequest);

    return refundResponse;
  }
}