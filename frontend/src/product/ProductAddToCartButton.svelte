<script lang="ts">
  import { Cart } from "../cart/cart";
  import InputNumber from "../common/InputNumber.svelte";
  import type { IProduct } from "./IProduct";
  export let productData: IProduct;

  let quantity: number = Cart.getItemQuantity(productData);

  Cart.getCartStore().subscribe(() => {
    quantity = Cart.getItemQuantity(productData);
  });

  function addToCart() {
    Cart.addItem(productData, 1);
  }

  function updateQuantity(newQuantity: number) {
    Cart.setItem(productData, newQuantity);
  }

  function onChange(value: number) {
    quantity = value;

    // if quantity is 0 then remove item from cart
    if (quantity <= 0) {
      Cart.setItem(productData, 0);
      return;
    }

    updateQuantity(value);
  }
</script>

{#if quantity >= 1}
  <InputNumber value={quantity} {onChange} />
{:else}
  <button
    class="w-full h-full py-3 rounded-md font-bold border-2 border-blue-400 bg-blue-400 text-white"
    on:click={addToCart}
  >
    Add to cart
  </button>
{/if}
