import { BaseAPI } from "./base.api";

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface IUpdateUser {
  name: string;
}

export class UserAPI extends BaseAPI {
  async getUser() {
    const url = "api/user";
    const result = await this.send(url, "GET");
    if (result.status !== 200) throw new Error("Can't get user from API");
    return result.data as IUser;
  }

  async updateUser(data: IUpdateUser) {
    const url = "api/user/update";
    await this.send(url, "PATCH", data);
  }
}
