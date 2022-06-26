<script lang="ts">
  import { onMount } from "svelte";
  import { IOrder, IOrderPaginationResult, OrderAPI } from "../api/order.api";
  import Footer from "../common/Footer.svelte";
  import Navbar from "../common/Navbar.svelte";
  import OrderPaginationRecord from "./OrderPaginationRecord.svelte";
  import OrderSearchBar from "./OrderSearchBar.svelte";

  export let page: number = 1;

  const api = new OrderAPI();
  let orders: IOrder[] = [];
  let pageData: IOrderPaginationResult;
  let searchValue: string;

  async function load() {
    orders = [];
    const result = await api.paginate(page, 5, searchValue);
    orders = [...result.items];
    pageData = result;
  }

  function generatePaginationNumber() {
    const result: number[] = [];
    for (
      let i = pageData.meta.currentPage + 1;
      i < pageData.meta.totalPages;
      i++
    ) {
      result.push(i);
    }
    return result;
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

  {#if pageData}
    <div class="flex flex-col mt-5 w-full space-y-20">
      {#if orders.length > 0}
        {#each orders as order}
          <OrderPaginationRecord orderData={order} />
        {/each}
      {/if}
    </div>

    <div class="flex flex-row justify-end mt-20 w-full space-x-2">
      <button
        type="button"
        class="w-12 h-12 bg-white border-2 border-blue-600 text-blue-600 font-bold text-lg"
        on:click={() => {
          changePage(1);
        }}
      >
        1
      </button>

      {#each generatePaginationNumber() as pageNumber}
        <button
          type="button"
          class="w-12 h-12 bg-white border-2 border-blue-600 text-blue-600 font-bold text-lg"
          on:click={() => {
            changePage(pageNumber);
          }}
        >
          {pageNumber}
        </button>
      {/each}

      {#if pageData.meta.totalPages > 1}
        <button
          type="button"
          class="w-12 h-12 bg-white border-2 border-blue-600 text-blue-600 font-bold text-lg"
          on:click={() => {
            changePage(pageData.meta.totalPages);
          }}
        >
          {pageData.meta.totalPages}
        </button>
      {/if}
    </div>
  {:else}
    <div class="my-[100vh]" />
  {/if}
</div>

<Footer />
