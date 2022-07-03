import { AuthAPI } from "../api/auth.api";
import { UserAPI } from "../api/user.api";
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
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("rememberUser", `${remember}`);
  }

  public static async logout() {
    // clear user store
    setUser(null);
    // clear access toekn in local storage
    localStorage.removeItem("accessToken");
  }

  public static async load() {
    // get user from local storage
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        // set user store
        setUser({ accessToken, isLoggedIn: true });
        // try get user from api
        const api = new UserAPI();
        const userData = await api.getUser();
        console.log(userData);
        // set user data
        setUser({
          accessToken,
          isLoggedIn: true,
          name: userData.name,
          role: userData.role,
        });
      } catch (error) {
        // clear user store
        setUser(null);
        // remove access token from local storage
        localStorage.removeItem("accessToken");
        // redirect to index
        window.location.href = "/";
      }
    }
  }
}
