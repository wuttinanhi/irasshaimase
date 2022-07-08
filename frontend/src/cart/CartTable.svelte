<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { Cart } from "./cart";
  import type { ICart } from "./cart.interface";
  import CartTableRow from "./CartTableRow.svelte";

  const cartStore = Cart.getCartStore();
  let cartData: ICart = null;

  function load() {
    cartData = null;
    cartData = Cart.getCart();
  }

  async function validate() {
    await Cart.validate();
    load();
  }

  // looper variable
  let looper;

  // on mount event
  onMount(() => {
    // validate on start
    validate();
    // start looping check cart every 10 seconds
    looper = setInterval(() => validate(), 10000);
  });

  // remove interval when destroyed
  onDestroy(() => {
    clearInterval(looper);
  });
</script>

<div class="flex flex-col w-full border-b-2">
  <div class="flex py-5 font-bold bg-gray-100 text-black">
    <div class="flex basis-4/12 flex-grow justify-center">
      <h1>Product</h1>
    </div>

    <div class="flex basis-2/12 flex-grow justify-center">
      <h1>Price</h1>
    </div>

    <div class="flex basis-2/12 flex-grow justify-center">
      <h1>Amount</h1>
    </div>

    <div class="flex basis-2/12 flex-grow justify-center">
      <h1>Total</h1>
    </div>

    <div class="flex basis-2/12 flex-grow justify-center">
      <h1>Action</h1>
    </div>
  </div>

  {#if cartData && cartData.items.length >= 1}
    {#each cartData.items as item}
      <CartTableRow cartItem={item} callback={load} />
    {/each}
  {:else}
    <div class="flex py-5 border-t-2 bg-gray-50 justify-center">
      <h1 class="my-3 text-center">Cart empty</h1>
    </div>
  {/if}
</div>
