<script lang="ts">
  import { navigate } from "svelte-routing";
  import Footer from "../common/Footer.svelte";
  import Navbar from "../common/Navbar.svelte";
  import { User } from "./user";
  let email: string;
  let password: string;
  let remember: boolean;

  async function login() {
    try {
      // try login user
      await User.login(email, password, remember);
      // load user
      await User.load();
      // redirect to index page
      navigate("/", { replace: true });
    } catch (error) {
      alert(error);
    }
  }
</script>

<Navbar />
<div class="flex flex-row my-[20vh] justify-center">
  <div class="flex flex-col w-full p-5 md:basis-1/5 gap-4">
    <div class="flex">
      <h1 class="text-2xl">Login</h1>
    </div>

    <div class="flex">
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        class="w-full p-2 border-2 border-gray-500"
        bind:value={email}
      />
    </div>

    <div class="flex">
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        class="w-full p-2 border-2 border-gray-500"
        bind:value={password}
      />
    </div>

    <div class="flex">
      <input
        type="checkbox"
        id="remember"
        name="remember"
        class="mt-1"
        bind:checked={remember}
      />
      <label for="remember" class="ml-2">Remember me</label>
    </div>

    <div class="flex">
      <button
        type="button"
        on:click={login}
        class="p-3 bg-blue-600 text-white w-full"
      >
        Login
      </button>
    </div>
  </div>
</div>
<Footer />
