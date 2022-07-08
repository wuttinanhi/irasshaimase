<script lang="ts">
  import Footer from "../common/Footer.svelte";
  import Navbar from "../common/Navbar.svelte";
  import CartSelectShippingAddress from "./CartSelectShippingAddress.svelte";
  import CartSummary from "./CartSummary.svelte";
  import CartTable from "./CartTable.svelte";
</script>

<Navbar />

<div class="flex flex-col px-3 lg:pt-8 lg:px-32 2xl:pt-8 2xl:px-96">
  <div class="flex my-10">
    <h1 class="text-4xl font-bold">Cart</h1>
  </div>

  <div class="flex">
    <CartTable />
  </div>

  <div class="flex mt-10 w-full flex-col md:flex-row space-x-2">
    <div class="flex w-full mt-2 md:basis-6/12">
      <CartSelectShippingAddress />
    </div>
    <div class="flex w-full mt-2 md:basis-6/12">
      <CartSummary />
    </div>
  </div>
</div>

<Footer />
