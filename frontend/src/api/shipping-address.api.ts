import { BaseAPI } from "./base.api";

export interface IShippingAddress {
  id?: number;
  userId?: number;
  firstname?: string;
  lastname?: string;
  phoneNumber?: string;
  houseNumber?: string;
  alley?: string;
  lane?: string;
  street?: string;
  subArea?: string;
  district?: string;
  province?: string;
  postalCode?: number;
  info?: string;
  default?: boolean;
}

export class ShippingAddressAPI extends BaseAPI {
  async getAll() {
    const url = "api/shipping-address/all";
    const result = await this.get(url, "GET");
    return result as IShippingAddress[];
  }

  async add(data: IShippingAddress) {
    const url = "api/shipping-address/create";
    const result = await this.send(url, "POST", data);
    if (result.status !== 201) {
      throw new Error("error while adding shipping address");
    }
  }

  async update(id: number, data: IShippingAddress) {
    const url = `api/shipping-address/update?id=${id}`;
    const result = await this.send(url, "PATCH", data);
    if (result.status !== 200) {
      throw new Error("error while updating shipping address");
    }
  }

  async delete(id: number) {
    const url = `api/shipping-address/delete?id=${id}`;
    const result = await this.send(url, "DELETE");
    if (result.status !== 200) {
      throw new Error("error while deleting shipping address");
    }
  }
}
