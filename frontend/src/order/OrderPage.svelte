<script lang="ts">
  import { IOrder, IOrderPaginationResult, OrderAPI } from "../api/order.api";
  import Footer from "../common/Footer.svelte";
  import Navbar from "../common/Navbar.svelte";
  import OrderRow from "./OrderRow.svelte";

  const api = new OrderAPI();
  export let page: number = 1;
  let orders: IOrder[] = [];
  let pageData: IOrderPaginationResult;

  async function load() {
    orders = [];
    const result = await api.paginate(page, 5);
    orders = [...result.items];
    pageData = result;
  }

  function generatePagination() {
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
    page = to;
    load();
  }

  load();
</script>

<Navbar />

<div class="flex flex-col px-3 lg:pt-8 lg:px-32 2xl:pt-8 2xl:px-96">
  <div class="flex my-5">
    <h1 class="text-4xl font-bold">Order</h1>
  </div>

  {#if pageData}
    <div class="flex flex-col mt-5 w-full space-y-3">
      {#if orders.length > 0}
        {#each orders as order}
          <OrderRow orderData={order} />
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

      {#each generatePagination() as p}
        <button
          type="button"
          class="w-12 h-12 bg-white border-2 border-blue-600 text-blue-600 font-bold text-lg"
          on:click={() => {
            changePage(p);
          }}
        >
          {p}
        </button>
      {/each}

      <button
        type="button"
        class="w-12 h-12 bg-white border-2 border-blue-600 text-blue-600 font-bold text-lg"
        on:click={() => {
          changePage(pageData.meta.totalPages);
        }}
      >
        {pageData.meta.totalPages}
      </button>
    </div>
  {/if}
</div>

<Footer />
