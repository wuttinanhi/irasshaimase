<script lang="ts">
  import { onMount } from "svelte";
  import { IOrder, IOrderPaginationResult, OrderAPI } from "../api/order.api";
  import Footer from "../common/Footer.svelte";
  import Navbar from "../common/Navbar.svelte";
  import PaginationMenu from "../common/PaginationMenu.svelte";
  import OrderPaginationRecord from "./OrderPaginationRecord.svelte";
  import OrderSearchBar from "./OrderSearchBar.svelte";

  export let page: number = 1;

  const api = new OrderAPI();
  let orders: IOrder[] = [];
  let data: IOrderPaginationResult;
  let searchValue: string;

  async function load() {
    orders = [];
    const result = await api.paginate(page, 5, searchValue);
    orders = [...result.items];
    data = result;
  }

  function changePage(to: number) {
    // set page to
    page = to;
    // load again
    load();
    // scroll to top
    window.scrollTo(0, 0);
  }

  function onSearch() {
    load();
  }

  onMount(() => {
    load();
  });
</script>

<Navbar />

<div class="flex flex-col px-3 lg:pt-8 lg:px-32 2xl:pt-8 2xl:px-96">
  <div class="flex my-5">
    <h1 class="text-4xl font-bold">Order</h1>
  </div>

  <div class="flex my-5 w-full">
    <OrderSearchBar bind:searchValue {onSearch} />
  </div>

  {#if data}
    <div class="flex flex-col mt-5 w-full space-y-20">
      {#if orders.length > 0}
        {#each orders as order}
          <OrderPaginationRecord orderData={order} />
        {/each}
      {:else}
        <h1 class="w-full text-center text-xl italic">Not Found</h1>
      {/if}
    </div>

    <div class="flex flex-row justify-end mt-20 w-full space-x-2">
      <PaginationMenu onChange={changePage} pagination={data.meta} />
    </div>
  {:else}
    <div class="my-[100vh]" />
  {/if}
</div>

<Footer />
