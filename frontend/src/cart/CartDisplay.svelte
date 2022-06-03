<script lang="ts">
  import { Cart } from "./cart";
  import CartHeader from "./CartHeader.svelte";
  import CartRow from "./CartRow.svelte";

  const cartStore = Cart.getCartStore();
  const cartItems = $cartStore.items;
</script>

<div class="flex flex-col w-full border-b-2">
  <CartHeader />

  {#each cartItems as item}
    <CartRow cartItem={item} />
  {/each}
</div>
