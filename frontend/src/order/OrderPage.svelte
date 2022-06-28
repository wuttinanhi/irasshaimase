<script lang="ts">
  import { onMount } from "svelte";
  import { IOrder, IOrderPaginationResult, OrderAPI } from "../api/order.api";
  import Footer from "../common/Footer.svelte";
  import Navbar from "../common/Navbar.svelte";
  import PaginationMenu from "../common/PaginationMenu.svelte";
  import { EOrderStatus } from "../enum/order-status.enum";
  import OrderPaginationRecord from "./OrderPaginationRecord.svelte";
  import OrderSearchBar from "./OrderSearchBar.svelte";

  export let page: number = 1;

  const api = new OrderAPI();
  let orders: IOrder[] = [];
  let data: IOrderPaginationResult;

  let searchValue: string = null;
  let status: EOrderStatus = null;

  async function load() {
    try {
      data = null;
      orders = [];
      const result = await api.paginate({
        page: page,
        limit: 2,
        search: searchValue || null,
        status: status || null,
        sort: "DESC",
      });
      if (result.items) orders = [...result.items];
      data = result;
    } catch (error) {
      // TODO: alert user unable to load data
    }
  }

  function setStatus(value: EOrderStatus) {
    status = value;
    page = 1;
    load();
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

  <div class="flex flex-col w-full md:flex-row md:mt-10 md:space-x-10">
    <div
      class="flex flex-row space-x-5 md:space-y-5 md:space-x-0 md:flex-col w-full md:basis-1/6"
    >
      <button
        class="flex text-left {status === null ? 'font-bold' : ''}"
        on:click={() => {
          setStatus(null);
        }}
      >
        All
      </button>

      <button
        class="
          flex text-left 
          {status === EOrderStatus.PENDING ? 'font-bold' : ''}
        "
        on:click={() => {
          setStatus(EOrderStatus.PENDING);
        }}
      >
        Pending
      </button>

      <button
        class="
          flex text-left 
          {status === EOrderStatus.PAID ? 'font-bold' : ''}
        "
        on:click={() => {
          setStatus(EOrderStatus.PAID);
        }}
      >
        Paid
      </button>

      <button
        class="
        flex text-left 
        {status === EOrderStatus.DELIVERING ? 'font-bold' : ''}
        "
        on:click={() => {
          setStatus(EOrderStatus.DELIVERING);
        }}
      >
        Delivering
      </button>

      <button
        class="
        flex text-left 
        {status === EOrderStatus.RECEIVED ? 'font-bold' : ''}
        "
        on:click={() => {
          setStatus(EOrderStatus.RECEIVED);
        }}
      >
        Received
      </button>
    </div>

    <div class="flex w-full md:basis-5/6 md:border-l-2">
      {#if data}
        <div class="flex flex-col md:ml-5 w-full">
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
        </div>
      {/if}
    </div>
  </div>
</div>

<Footer />
