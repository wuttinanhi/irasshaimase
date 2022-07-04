import { Order } from '../order/entities/order.entity';
import { IOrderReport } from '../order/order.interface';
import { Payment } from '../payment/entities/payment.entity';
import { User } from '../user/entities/user.entity';

export type IOrderType = Order | IOrderReport;

export type IPopulatedOrder = IOrderType & { user?: User; payments?: Payment[] };

export interface IOrderPopulateOptions {
  user?: boolean;
  payment?: boolean;
}
