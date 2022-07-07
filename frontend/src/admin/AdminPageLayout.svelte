<script lang="ts">
  import { navigate } from "svelte-routing";

  import Footer from "../common/Footer.svelte";
  import Navbar from "../common/Navbar.svelte";
  import AdminOrderManagePage from "./order/AdminOrderManagePage.svelte";
  import AdminPaymentManagePage from "./payment/AdminPaymentManagePage.svelte";
  import AdminProductManagePage from "./product/AdminProductManagePage.svelte";

  type Menu = "PRODUCT" | "ORDER" | "PAYMENT";
  export let page: Menu = "PRODUCT";

  const navigateMap = {
    ORDER: "/admin/order",
    PAYMENT: "/admin/payment",
    PRODUCT: "/admin/product",
  };

  function goto(to: Menu) {
    navigate(navigateMap[to]);
  }
</script>

<Navbar />

<div class="flex flex-col lg:pt-8 lg:px-32 2xl:pt-8 2xl:px-96">
  <div class="flex flex-col w-full md:flex-row md:mt-10 md:space-x-0">
    <div
      class="flex flex-row space-x-5 md:space-y-2 md:space-x-0 md:flex-col w-full md:basis-1/6"
    >
      <div
        class="flex flex-col bg-gray-50 max-h-fit space-y-5 px-5 py-5 border-2 w-full sm:w-fit"
      >
        <h1 class="flex text-xl font-bold mb-5">Admin Menu</h1>

        <button
          class="
            flex text-left 
            {page === 'PRODUCT' ? 'font-bold' : ''}
          "
          disabled={page === "PRODUCT"}
          on:click={() => goto("PRODUCT")}
        >
          Product
        </button>

        <button
          class="
            flex text-left 
            {page === 'ORDER' ? 'font-bold' : ''}
          "
          on:click={() => goto("ORDER")}
          disabled={page === "ORDER"}
        >
          Order
        </button>

        <button
          class="
            flex text-left 
            {page === 'PAYMENT' ? 'font-bold' : ''}
          "
          on:click={() => goto("PAYMENT")}
          disabled={page === "PAYMENT"}
        >
          Payment
        </button>
      </div>
    </div>

    <div class="flex w-full md:basis-5/6">
      {#if page === "ORDER"}
        <AdminOrderManagePage />
      {:else if page === "PAYMENT"}
        <AdminPaymentManagePage />
      {:else if page === "PRODUCT"}
        <AdminProductManagePage />
      {/if}
    </div>
  </div>
</div>

<Footer />
