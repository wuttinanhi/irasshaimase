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

export interface IOrderReport {
  id: number;
  userId: number;
  total: number;
  status: string;
  createdAt: Date;
  shippingAddress: string;
  orderItems: IOrderItem[];
}
