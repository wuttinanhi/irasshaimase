<script lang="ts">
  import Footer from "../common/Footer.svelte";
  import Navbar from "../common/Navbar.svelte";
  import Cart from "./CartDisplay.svelte";
  import CartSummary from "./CartSummary.svelte";
</script>

<Navbar />

<div class="flex flex-col px-3 md lg:pt-16 lg:px-32 2xl:pt-16 2xl:px-96">
  <div class="flex my-10">
    <h1 class="text-4xl font-bold">Cart</h1>
  </div>

  <div class="flex">
    <Cart />
  </div>

  <div class="flex mt-10 w-full justify-end">
    <div class="flex basis-4/12"><CartSummary /></div>
  </div>
</div>

<Footer />
