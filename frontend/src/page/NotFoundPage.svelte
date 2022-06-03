<script lang="ts">
  import { Link } from "svelte-routing";
  import Footer from "../common/Footer.svelte";
  import Navbar from "../common/Navbar.svelte";
</script>

<Navbar />

<div
  class="flex flex-col mt-[30vh] lg:px-32 2xl:px-96 content-center items-center justify-center"
>
  <div class="flex">
    <h1 class="text-9xl">404</h1>
  </div>
  <div class="flex mt-5">
    <h1 class="text-xl">
      Page not found
      <Link to="/">
        <a href="/" class="text-blue-600 hover:underline"> Return to Home</a>
      </Link>
    </h1>
  </div>
</div>

<Footer />
