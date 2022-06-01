<script lang="ts">
  import ProductCard from "./ProductCard.svelte";
</script>

<div class="flex w-full flex-wrap">
  {#each { length: 7 } as _, i}
    <ProductCard />
  {/each}
</div>
