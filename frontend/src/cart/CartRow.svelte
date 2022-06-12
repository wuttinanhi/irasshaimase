<script lang="ts">
  import InputNumber from "../common/InputNumber.svelte";
  import ResponsiveDebugger from "../common/ResponsiveDebugger.svelte";
  import { Cart } from "./cart";
  import type { ICartItem } from "./ICart";

  export let cartItem: ICartItem;

  let removed = false;

  function removeRow() {
    Cart.setItem(cartItem.product, 0);
    removed = true;
  }

  function updateQuantity(value: number) {
    Cart.setItem(cartItem.product, value);
  }

  // update cartItem when cart change
  Cart.getCartStore().subscribe(() => {
    if (!cartItem && !cartItem?.product) return;
    cartItem = Cart.getItem(cartItem.product);
  });
</script>

<ResponsiveDebugger />
{#if removed === false}
  <div class="flex py-5 border-t-2 bg-gray-50">
    <div class="flex basis-4/12 justify-center">
      <div class="flex flex-col sm:flex-row w-full justify-center items-center">
        <div class="flex sm:basis-1/2 justify-center">
          <img
            src={cartItem.product.image}
            alt=""
            class="flex object-fill w-20 h-20"
          />
        </div>

        <div class="flex sm:basis-1/2 justify-start truncate">
          <p>{cartItem.product.name}</p>
        </div>
      </div>
    </div>

    <div class="flex basis-2/12 justify-center items-center">
      <h1>{cartItem.product.price}</h1>
    </div>

    <div class="flex basis-2/12 justify-center items-center">
      <InputNumber
        value={cartItem?.quantity}
        min={1}
        onChange={(v) => {
          updateQuantity(v);
        }}
      />
    </div>

    <div class="flex basis-2/12 justify-center items-center">
      <h1>{cartItem.product.price * cartItem.quantity}</h1>
    </div>

    <div class="flex basis-2/12 justify-center items-center">
      <button type="button" class="underline" on:click={removeRow}
        >Remove</button
      >
    </div>
  </div>
{/if}
