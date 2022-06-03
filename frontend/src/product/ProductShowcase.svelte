<script lang="ts">
  import { MOCK_PRODUCTS } from "../etc/mock";
  import ProductCard from "./ProductCard.svelte";
</script>

<div class="flex w-full flex-wrap">
  {#each MOCK_PRODUCTS as product}
    <ProductCard productData={product} />
  {/each}
</div>
