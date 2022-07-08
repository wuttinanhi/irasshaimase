import { getUser } from "../user/user.store";

export interface IPaginationMeta {
  currentPage: number;
  totalItemsInPage: number;
  totalItems: number;
  totalPages: number;
}

export class IAPIResult {
  data: any;
  status: number;
  response: Response;
}

export class IAPIError extends Error {
  status: number;
  data: any;
  message: string;
  response: Response;
}

export class BaseAPI {
  protected baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:3000";
  }

  protected get(url: string, method = "GET", body?: any): Promise<any> {
    // headers object
    const headers = {};
    headers["Content-Type"] = "application/json";

    // set authorization header if user is logged in
    const userValue = getUser();
    const accessToken = userValue?.accessToken;
    if (userValue && accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return fetch(`${this.baseUrl}/${url}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  protected createHeader() {
    // headers object
    const headers = {};
    headers["Content-Type"] = "application/json";

    // set authorization header if user is logged in
    const userValue = getUser();
    const accessToken = userValue?.accessToken;
    if (userValue && accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    // return headers
    return headers;
  }

  protected async send(
    url: string,
    method = "GET",
    body?: any
  ): Promise<IAPIResult> {
    // headers object
    const headers = this.createHeader();

    // send request
    const response = await fetch(`${this.baseUrl}/${url}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
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
      const error = new IAPIError();
      error.name = data.message;
      error.status = status;
      error.data = data;
      error.message = data.message;
      error.response = response;
      throw error;
    }

    // return result
    return { data, status, response };
  }
}
