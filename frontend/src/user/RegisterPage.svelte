<script lang="ts">
  import { Link, navigate } from "svelte-routing";
  import { AuthAPI } from "../api/auth.api";
  import Footer from "../common/Footer.svelte";
  import Navbar from "../common/Navbar.svelte";
  import { User } from "./user";

  let name: string;
  let email: string;
  let password: string;

  async function register() {
    try {
      // create api instance
      const authApi = new AuthAPI();
      // register user
      await authApi.register({ name, email, password });
      // try login user
      await User.login(email, password, false);
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
      <h1 class="text-2xl">Register</h1>
    </div>

    <div class="flex">
      <input
        type="text"
        id="text"
        name="text"
        placeholder="Name"
        class="w-full p-2 border-2 border-gray-500"
        bind:value={name}
      />
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

    <div class="flex flex-col">
      <button
        type="button"
        on:click={register}
        class="p-3 bg-blue-600 text-white w-full"
      >
        Register
      </button>

      <Link to="/login" class="text-blue-500 underline mt-3">
        Already have an account?
      </Link>
    </div>
  </div>
</div>
<Footer />
