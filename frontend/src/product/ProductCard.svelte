<script lang="ts">
  import { MOCK_PRODUCT_DATA } from "../etc/mock";
  import type { IProduct } from "./IProduct";
  import ProductAddToCartButton from "./ProductAddToCartButton.svelte";
  import ProductOverlay from "./ProductOverlay.svelte";

  export let productData: IProduct = MOCK_PRODUCT_DATA;

  let overlay: ProductOverlay;
</script>

<div class="flex flex-row basis-12/12 sm:basis-1/3 min-w-0">
  <div class="flex flex-col m-3 rounded-md border-2 border-gray-200 min-w-0">
    <div class="flex basis-8/12 min-w-0 overflow-hidden">
      <img
        src={productData.imageUrl}
        alt={productData.name}
        class="object-fill w-full h-full"
        on:click={() => overlay.showOverlay()}
      />
    </div>

    <div class="flex flex-col basis-4/12 px-3">
      <div class="flex pt-3" on:click={() => overlay.showOverlay()}>
        <p class="text-lg font-bold truncate">{productData.name}</p>
      </div>

      <div class="flex" on:click={() => overlay.showOverlay()}>
        <h3 class="flex text-lg">${productData.price}</h3>
      </div>

      <div class="flex py-3">
        <ProductAddToCartButton {productData} />
      </div>
    </div>
  </div>
</div>

<ProductOverlay bind:this={overlay} {productData} />
