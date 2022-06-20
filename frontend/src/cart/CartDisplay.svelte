<script lang="ts">
  import { onDestroy } from "svelte";
  import { Cart } from "./cart";
  import CartHeader from "./CartHeader.svelte";
  import CartRow from "./CartRow.svelte";

  // get cart data
  const cartStore = Cart.getCartStore();
  let cartItems = $cartStore.items;

  // run on load
  Cart.validate();
  cartItems = $cartStore.items;

  // check cart every 10 seconds
  const looper = setInterval(() => {
    Cart.validate();
    cartItems = $cartStore.items;
  }, 10000);

  // remove interval when destroyed
  onDestroy(() => {
    clearInterval(looper);
  });
</script>

<div class="flex flex-col w-full border-b-2">
  <CartHeader />

  {#if cartItems.length > 0}
    {#each cartItems as item}
      <CartRow cartItem={item} />
    {/each}
  {:else}
    <div class="flex py-5 border-t-2 bg-gray-50 justify-center">
      <h1 class="my-3 text-center">Cart empty</h1>
    </div>
  {/if}
</div>
