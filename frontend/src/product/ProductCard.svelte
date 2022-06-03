<script lang="ts">
  import { LOREM } from "../etc/lorem";
  import type { IProduct } from "./IProduct";
  import ProductAddToCartButton from "./ProductAddToCartButton.svelte";
  import ProductOverlay from "./ProductOverlay.svelte";

  export let productData: IProduct = {
    id: 1,
    name: "Teddy Bear",
    description: LOREM,
    price: 5.99,
    imageUrl: "/img/teddy.jpg",
  };

  let overlay: ProductOverlay;
</script>

<div class="flex flex-row basis-12/12 sm:basis-1/3">
  <div class="p-3">
    <div class="rounded-md border-2 border-gray-200">
      <img
        src="img/teddy.jpg"
        alt=""
        class="w-full h-fit"
        on:click={() => overlay.showOverlay()}
      />

      <div class="px-3 pb-3">
        <h3 class="pt-3 text-lg font-bold">{productData.name}</h3>

        <h3 class="text-lg pb-3">
          ${productData.price}
        </h3>

        <ProductAddToCartButton {productData} />
      </div>
    </div>
  </div>
</div>

<ProductOverlay bind:this={overlay} {productData} />
