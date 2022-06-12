<script lang="ts">
  import { ProductAPI } from "../api/product.api";
  import type { IProduct } from "./IProduct";
  import ProductCard from "./ProductCard.svelte";

  let products: IProduct[] = [];

  async function getProduct() {
    const productApi = new ProductAPI();
    products = await productApi.getAllProducts();
    console.log(products);
  }

  getProduct();
</script>

{#if products.length === 0}
  <div class="flex flex-col items-center justify-center my-52">
    <h1 class="text-xl text-gray-800 text-center">Loading Product...</h1>
  </div>
{/if}

<div class="flex w-full flex-wrap">
  {#each products as product}
    <ProductCard productData={product} />
  {/each}
</div>
