import { BaseAPI } from "./base.api";

export interface IAuthLoginResult {
  accessToken: string;
}

export interface IAuthRegister {
  name: string;
  email: string;
  password: string;
}

export class AuthAPI extends BaseAPI {
  async register(data: IAuthRegister) {
    const url = "api/auth/register";
    const body = data;
    await this.send(url, "POST", body);
  }

  async login(email: string, password: string) {
    const url = "api/auth/login";
    const body = { email, password };
    const result = await this.get(url, "POST", body);
    return result as IAuthLoginResult;
  }

  async changePassword(currentPassword: string, newPassword: string) {
    const url = "api/auth/changepassword";
    const body = {
      password: currentPassword,
      newPassword: newPassword,
    };
    const result = await this.send(url, "POST", body);
    if (result.status !== 201) {
      throw new Error("change password failed");
    }
  }
}
