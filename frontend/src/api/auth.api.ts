import { BaseAPI } from "./base.api";

export class AuthAPI extends BaseAPI {
  async login(email: string, password: string) {
    const url = "api/auth/login";
    const body = { email, password };
    const result = await this.get(url, "POST", body);
    return result.accessToken;
  }
}
