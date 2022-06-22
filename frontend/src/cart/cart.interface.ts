import type { IProduct } from "../product/IProduct";

export interface ICart {
  items: ICartItem[];
  shippingAddressId: number;
  total: number;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
  available: boolean;
}
