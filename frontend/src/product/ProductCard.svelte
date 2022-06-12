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
    <div class="flex flex-grow basis-8/12 overflow-hidden min-w-0">
      <img
        src={productData.image}
        alt={productData.name}
        class="flex object-fill w-[500px] h-[500px] max-h-[350px]"
        on:click={() => overlay.showOverlay()}
      />
    </div>

    <div class="flex flex-shrink flex-col basis-4/12 px-3 min-w-0">
      <div on:click={() => overlay.showOverlay()}>
        <div class="flex pt-3">
          <p class="text-lg font-bold truncate">{productData.name}</p>
        </div>

        <div class="flex">
          <h3 class="flex text-lg">${productData.price}</h3>
        </div>
      </div>

      <div class="flex py-3 justify-center">
        <ProductAddToCartButton {productData} />
      </div>
    </div>
  </div>
</div>

<ProductOverlay bind:this={overlay} {productData} />
