<script lang="ts">
  import Footer from "./Footer.svelte";
  import Navbar from "./Navbar.svelte";
  import ProductCard from "./ProductCard.svelte";
</script>

<Navbar />

<div class="flex flex-col pt-16 px-96">
  <div
    class="flex w-full h-56 bg-blue-300 content-center items-center justify-center "
  >
    <h1 class="text-white text-3xl font-bold">BANNER</h1>
  </div>

  <div class="flex w-full py-8">
    <h3 class="font-bold text-3xl">Product</h3>
  </div>

  <div class="flex w-full flex-wrap">
    {#each { length: 9 } as _, i}
      <ProductCard />
    {/each}
  </div>

  <div class="my-10" />
</div>

<Footer />
