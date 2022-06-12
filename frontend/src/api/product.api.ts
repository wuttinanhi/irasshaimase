import type { IProduct } from "../product/IProduct";
import { BaseAPI } from "./base.api";

export class ProductAPI extends BaseAPI {
  async getAllProducts(page = 1, limit = 10): Promise<IProduct[]> {
    const placeHolderImg = "https://via.placeholder.com/600x600/00b7ff/ffffff";
    const url = `api/product/paginate?page=${page}&limit=${limit}`;
    const request = await this.get(url);
    return request.items.map((item: any) => {
      return { ...item, image: item.image || placeHolderImg };
    });
  }
}
