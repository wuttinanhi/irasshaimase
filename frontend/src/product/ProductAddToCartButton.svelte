<script lang="ts">
  import { Cart } from "../cart/cart";
  import type { IProduct } from "./IProduct";
  export let productData: IProduct;

  let quantity: number = Cart.getItemQuantity(productData);

  function addToCart() {
    Cart.addItem(productData, 1);
  }

  Cart.getCartStore().subscribe(() => {
    quantity = Cart.getItemQuantity(productData);
  });
</script>

{#if quantity >= 1}
  <button
    class="w-full bg-white h-full py-3 rounded-md text-blue-400 font-bold border-2 border-blue-400"
    on:click={addToCart}
  >
    In cart ({quantity})
  </button>
{:else}
  <button
    class="w-full bg-blue-400 h-full py-3 rounded-md text-white font-bold"
    on:click={addToCart}
  >
    Add to cart
  </button>
{/if}
