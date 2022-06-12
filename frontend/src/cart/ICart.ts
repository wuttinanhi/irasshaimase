import type { IProduct } from "../product/IProduct";

export interface ICart {
  items: ICartItem[];
  total: number;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
  available: boolean;
}
