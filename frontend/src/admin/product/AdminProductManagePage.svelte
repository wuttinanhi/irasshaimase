<script lang="ts">
  import { onMount } from "svelte";
  import { IProductPaginationResult, ProductAPI } from "../../api/product.api";
  import Footer from "../../common/Footer.svelte";
  import Navbar from "../../common/Navbar.svelte";
  import PaginationMenu from "../../common/PaginationMenu.svelte";
  import SearchBar from "../../common/SearchBar.svelte";
  import type { IProduct } from "../../product/IProduct";
  import AdminProductModal from "./AdminProductModal.svelte";
  import AdminProductTableHeader from "./AdminProductTableHeader.svelte";
  import AdminProductTableRow from "./AdminProductTableRow.svelte";

  const productApi = new ProductAPI();

  export let page: number = 1;
  let products: IProduct[] = [];
  let data: IProductPaginationResult;
  let searchValue: string = null;

  let addModal: AdminProductModal;

  function onCreateClick() {
    addModal.show();
  }

  async function load() {
    try {
      data = null;
      products = [];
      const result = await productApi.paginate({
        page: page,
        limit: 10,
        search: searchValue || null,
        sort: "DESC",
      });
      if (result.items) products = [...result.items];
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

<Navbar />

<AdminProductModal bind:this={addModal} callback={load} mode="ADD" />

<div class="flex flex-col px-3 lg:pt-8 lg:px-32 2xl:pt-8 2xl:px-96">
  <div class="flex my-5">
    <h1 class="text-3xl font-bold">Product Management</h1>
  </div>

  <div class="flex mt-5 flex-row gap-1">
    <button
      type="button"
      class="flex px-10 py-3 bg-blue-500 text-white font-bold"
      on:click={onCreateClick}
    >
      Create
    </button>
    <div class="flex flex-grow">
      <SearchBar {onSearch} {searchValue} />
    </div>
  </div>

  {#if data}
    <div class="flex flex-col w-full mt-5">
      <div class="flex flex-col mty-5 w-full">
        <AdminProductTableHeader />
        {#if products.length > 0}
          {#each products as data}
            <AdminProductTableRow {data} callback={load} />
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
