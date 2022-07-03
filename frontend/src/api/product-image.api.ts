import { getUser } from "../user/user.store";
import { BaseAPI } from "./base.api";

export class ProductImageAPI extends BaseAPI {
  async addProductImage(productId: number, file: File) {
    const url = `api/product-image/upload?productId=${productId}`;
    await this.upload(url, file);
  }

  protected async upload(url: string, file: File, method = "POST") {
    // headers object
    const headers = new Headers();
    // headers.append("Content-Type", "multipart/form-data");

    // set authorization header if user is logged in
    const userValue = getUser();
    const accessToken = userValue?.accessToken;
    if (userValue && accessToken) {
      headers.append("Authorization", `Bearer ${accessToken}`);
    }

    // form data
    var formData = new FormData();
    formData.append("files", file);

    // send request
    const response = await fetch(`${this.baseUrl}/${url}`, {
      method: method,
      headers: headers,
      body: formData,
    });

    // parse result
    let data = null;
    try {
      data = await response.json();
    } catch (error) {
      data = {};
    }
    const status = response.status;

    // throw error if response is not ok
    if (response.ok === false) {
      throw new Error(data.message);
    }

    // return result
    return { data, status, response };
  }
}
