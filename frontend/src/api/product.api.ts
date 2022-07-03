import { PLACEHOLDER_IMAGE } from "../etc/mock";
import { BaseAPI, IPaginationMeta } from "./base.api";

export interface IProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface IProductPaginateOptions {
  search?: string;
  page?: number;
  limit?: number;
  sort?: "ASC" | "DESC";
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
}

export interface IProductPaginationResult {
  items: IProduct[];
  meta: IPaginationMeta;
}

export class ProductAPI extends BaseAPI {
  async create(data: IProductDto) {
    const url = `api/product/create`;
    const request = await this.send(url, "POST", data);
    return request.data;
  }

  async update(id: any, data: IProductDto) {
    const url = `api/product/update?id=${id}`;
    const request = await this.send(url, "PATCH", data);
    return request.data;
  }

  async delete(id: any) {
    const url = `api/product/delete?id=${id}`;
    await this.send(url, "DELETE");
  }

  async paginate(options: IProductPaginateOptions) {
    const placeHolderImg = PLACEHOLDER_IMAGE;

    // parse options
    const params: any = { page: options.page, limit: options.limit };
    if (!options.page || options.page <= 0) {
      params.page = 1;
    }
    if (!options.limit || options.limit <= 0 || options.limit >= 50) {
      params.limit = 50;
    }
    if (options.search) {
      params.search = options.search;
    }
    if (!options.sort) {
      params.sort = "DESC";
    }

    // send request
    const url = `api/product/paginate?${new URLSearchParams(params)}`;
    const result = await this.send(url, "GET");

    // parse result
    const data: IProductPaginationResult = result.data;
    // replace null image with placeholder
    data.items = data.items.map((item: any) => {
      return { ...item, image: item.image || placeHolderImg };
    });

    return data as IProductPaginationResult;
  }
}
