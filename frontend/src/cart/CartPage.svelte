<script lang="ts">
  import Footer from "../common/Footer.svelte";
  import Navbar from "../common/Navbar.svelte";
  import CartDisplay from "./CartDisplay.svelte";
  import CartSelectShippingAddress from "./CartSelectShippingAddress.svelte";
  import CartSummary from "./CartSummary.svelte";
</script>

<Navbar />

<div class="flex flex-col px-3 lg:pt-8 lg:px-32 2xl:pt-8 2xl:px-96">
  <div class="flex my-10">
    <h1 class="text-4xl font-bold">Cart</h1>
  </div>

  <div class="flex">
    <CartDisplay />
  </div>

  <div class="flex mt-10 w-full flex-row space-x-2">
    <div class="flex w-full sm:basis-6/12 md:basis-5/12 xl:basis-6/12">
      <CartSelectShippingAddress />
    </div>
    <div class="flex w-full sm:basis-6/12 md:basis-5/12 xl:basis-6/12">
      <CartSummary />
    </div>
  </div>
</div>

<Footer />
