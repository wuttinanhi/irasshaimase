<script lang="ts">
  import Footer from "../common/Footer.svelte";
  import Navbar from "../common/Navbar.svelte";
  import Cart from "./Cart.svelte";
  import CartSummary from "./CartSummary.svelte";
</script>

<Navbar />

<div class="flex flex-col px-3 sm:pt-16 sm:px-96">
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
