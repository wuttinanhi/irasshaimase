import { Injectable } from '@nestjs/common';
import { OrderService } from '../order/order.service';
import { PaymentService } from '../payment/payment.service';
import { UserService } from '../user/user.service';
import { IReceipt } from './receipt.interface';

@Injectable()
export class ReceiptService {
  constructor(
    private readonly orderService: OrderService,
    private readonly paymentService: PaymentService,
    private readonly userService: UserService,
  ) {}

  async getById(id: number): Promise<IReceipt> {
    const order = await this.orderService.report(id);
    const user = await this.userService.findOne(order.userId);
    const paymentRecords = await this.paymentService.getByOrderId(order.id);

    const items = order.orderItems.map((item) => ({
      description: item.name,
      quantity: item.quantity,
      unitPrice: item.price,
      total: item.price * item.quantity,
    }));

    const payments = paymentRecords.map((data) => ({
      paymentId: data.id,
      paymentMethod: data.paymentMethod,
      paymentAmount: data.amount,
      paymentDate: new Date(data.createdAt).toLocaleString('en-GB', { timeZone: 'UTC' }),
    }));

    const receipt: IReceipt = {
      logoFilePath: process.env.RECEIPT_LOGO,
      shopName: process.env.RECEIPT_SHOP_NAME,
      shopAddress: process.env.RECEIPT_SHOP_ADDRESS,
      shopPhone: process.env.RECEIPT_SHOP_PHONE,
      shopEmail: process.env.RECEIPT_SHOP_EMAIL,
      shopWebsite: process.env.RECEIPT_SHOP_WEBSITE,

      customerName: `${user.name}`,
      customerAddress: order.shippingAddress,
      customerPhone: '',
      customerEmail: '',

      invoiceId: order.id,
      invoiceDate: order.createdAt.toLocaleString('en-GB', { timeZone: 'UTC' }),
      invoiceDueDate: null,

      discount: 0,
      subTotal: order.total,
      taxRate: 0,
      tax: 0,
      shippingAndHandling: 0,
      total: order.total,

      note: '-',
      orderId: order.id,
      status: order.status,

      items: items,
      payments: payments,
    };

    return receipt;
  }
}
