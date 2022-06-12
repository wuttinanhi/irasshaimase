export class BaseAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:3000";
  }

  public get(url: string, method = "GET", body?: any): Promise<any> {
    return fetch(`${this.baseUrl}/${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }
}
