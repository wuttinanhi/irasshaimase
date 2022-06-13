import { getUser } from "../user/user.store";

export class BaseAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:3000";
  }

  public get(url: string, method = "GET", body?: any): Promise<any> {
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
}
