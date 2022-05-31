<script lang="ts">
  import Footer from "./common/Footer.svelte";
  import Navbar from "./common/Navbar.svelte";
  import ProductShowcase from "./product/ProductShowcase.svelte";
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

  <ProductShowcase />

  <div class="my-10" />
</div>

<Footer />
