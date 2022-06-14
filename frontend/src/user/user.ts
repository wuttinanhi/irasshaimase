import { AuthAPI } from "../api/auth.api";
import { setUser } from "./user.store";

export class User {
  public static async login(email: string, password: string, remember = false) {
    // request login
    const api = new AuthAPI();
    const result = await api.login(email, password);
    if (!result.accessToken) throw new Error("Invalid login");
    // set user store
    setUser({ accessToken: result.accessToken, isLoggedIn: true });
    // set access token in local storage
    if (remember) {
      localStorage.setItem("accessToken", result.accessToken);
    }
  }

  public static async logout() {
    // clear user store
    setUser(null);
    // clear access toekn in local storage
    localStorage.removeItem("accessToken");
  }

  public static async loadUserFromLocalStorage() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setUser({ accessToken, isLoggedIn: true });
    }
  }
}
