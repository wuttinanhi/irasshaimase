import { PLACEHOLDER_IMAGE } from "../etc/mock";
import type { IProduct } from "../product/IProduct";
import { BaseAPI } from "./base.api";

export class ProductAPI extends BaseAPI {
  async getAllProducts(page = 1, limit = 10): Promise<IProduct[]> {
    const placeHolderImg = PLACEHOLDER_IMAGE;
    const url = `api/product/paginate?page=${page}&limit=${limit}`;
    const request = await this.get(url);
    return request.items.map((item: any) => {
      return { ...item, image: item.image || placeHolderImg };
    });
  }
}
