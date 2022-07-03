<script lang="ts">
  import { onMount } from "svelte";
  import {
    IPayment,
    IPaymentPaginationResult,
    PaymentAPI,
  } from "../../api/payment.api";
  import PaginationMenu from "../../common/PaginationMenu.svelte";
  import SearchBar from "../../common/SearchBar.svelte";
  import AdminPaymentTable from "./AdminPaymentTable.svelte";

  export let page: number = 1;

  const api = new PaymentAPI();
  let payments: IPayment[] = [];
  let data: IPaymentPaginationResult;
  let searchValue: string = null;

  async function load() {
    try {
      data = null;
      payments = [];
      const result = await api.paginate({
        page: page,
        limit: 10,
        search: searchValue || null,
        sort: "DESC",
        admin: true,
      });
      if (result.items) payments = [...result.items];
      data = result;
    } catch (error) {
      alert(error);
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

<div class="flex flex-col px-3 w-full">
  <div class="flex my-5">
    <h1 class="text-3xl font-bold">Payment Management</h1>
  </div>

  <div class="flex my-5 w-full">
    <SearchBar bind:searchValue {onSearch} />
  </div>

  {#if data}
    <div class="flex flex-col w-full">
      <div class="flex flex-col mt-5 w-full">
        <AdminPaymentTable data={payments} showUser={true} />
      </div>
      <div class="flex flex-row justify-end mt-20 w-full space-x-2">
        <PaginationMenu onChange={changePage} pagination={data.meta} />
      </div>
    </div>
  {/if}
</div>
