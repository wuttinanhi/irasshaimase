<script lang="ts">
  import { onMount } from "svelte";
  import {
    IPayment,
    IPaymentPaginationResult,
    PaymentAPI,
  } from "../api/payment.api";
  import Footer from "../common/Footer.svelte";
  import Navbar from "../common/Navbar.svelte";
  import PaginationMenu from "../common/PaginationMenu.svelte";
  import SearchBar from "../common/SearchBar.svelte";
  import PaymentTableHeader from "./PaymentTableHeader.svelte";
  import PaymentTableRow from "./PaymentTableRow.svelte";

  export let page: number = 1;

  const api = new PaymentAPI();
  let payment: IPayment[] = [];
  let data: IPaymentPaginationResult;
  let searchValue: string = null;

  async function load() {
    try {
      data = null;
      payment = [];
      const result = await api.paginate({
        page: page,
        limit: 5,
        search: searchValue || null,
        sort: "DESC",
      });
      if (result.items) payment = [...result.items];
      data = result;
    } catch (error) {
      // TODO: alert user unable to load data
    }
  }

  function changePage(to: number) {
    page = to;
    load();
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
    <h1 class="text-4xl font-bold">Payment</h1>
  </div>

  <div class="flex my-5 w-full">
    <SearchBar bind:searchValue {onSearch} />
  </div>

  {#if data}
    <div class="flex flex-col w-full">
      <div class="flex flex-col mt-5 w-full">
        <PaymentTableHeader />
        {#if payment.length > 0}
          {#each payment as data}
            <PaymentTableRow {data} />
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

<Footer />
