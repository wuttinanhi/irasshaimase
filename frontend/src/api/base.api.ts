export class BaseAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:3000";
  }

  public get(url: string): Promise<any> {
    return fetch(`${this.baseUrl}/${url}`).then((response) => response.json());
  }
}
