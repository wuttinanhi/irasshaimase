<script lang="ts">
  import { AuthAPI } from "../api/auth.api";
  import Navbar from "../common/Navbar.svelte";
  import { userStore } from "./user.store";
  let email: string;
  let password: string;

  async function login() {
    try {
      const api = new AuthAPI();
      const accessToken = await api.login(email, password);
      if (!accessToken) throw new Error("Login failed");
      userStore.set({ accessToken: accessToken });
    } catch (error) {
      alert(error);
    }
  }
</script>

<Navbar />
<!-- login form -->
<form>
  <h1>Login</h1>

  <label for="email">Email</label>
  <input
    type="email"
    id="email"
    name="email"
    placeholder="Email"
    bind:value={email}
  />
  <br />

  <label for="password">Password</label>
  <input
    type="password"
    id="password"
    name="password"
    placeholder="Password"
    bind:value={password}
  />
  <br />

  <button type="button" on:click={login}>Login</button>
</form>
