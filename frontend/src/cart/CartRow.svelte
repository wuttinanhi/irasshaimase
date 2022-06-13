<script lang="ts">
  import InputNumber from "../common/InputNumber.svelte";
  import { Cart } from "./cart";
  import type { ICartItem } from "./ICart";

  export let cartItem: ICartItem;
  let product = cartItem.product;
  let available = cartItem.available;

  function removeRow() {
    Cart.setItem(cartItem.product, 0);
  }

  function updateQuantity(value: number) {
    Cart.setItem(cartItem.product, value);
  }

  const store = Cart.getCartStore();

  // subscribe to cart store
  store.subscribe(() => {
    cartItem = Cart.getItem(product);
    if (cartItem?.product) {
      product = cartItem.product;
      available = cartItem.available;
    }
  });
</script>

{#if cartItem}
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
          <p>
            {available === false ? "(Not Available)" : ""}
            {cartItem.product.name}
          </p>
        </div>
      </div>
    </div>

    <div class="flex basis-2/12 justify-center items-center">
      <h1>{cartItem.product.price}</h1>
    </div>

    <div class="flex basis-2/12 justify-center items-center">
      <InputNumber
        value={available ? cartItem?.quantity : 0}
        min={1}
        onChange={(v) => {
          updateQuantity(v);
        }}
        disabled={available === false}
        max={product.stock}
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
