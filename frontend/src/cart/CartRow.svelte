<script lang="ts">
  import ConfirmModal from "../common/ConfirmModal.svelte";
  import InputNumber from "../common/InputNumber.svelte";
  import { Cart } from "./cart";
  import type { ICartItem } from "./cart.interface";

  export let cartItem: ICartItem;
  let product = cartItem.product;
  let available = cartItem.available;
  let quantity = 0;

  let confirmRemoveModal: ConfirmModal;

  function onRemoveClick() {
    confirmRemoveModal.showOverlay();
  }

  function onConfirmRemove(result: boolean) {
    if (result === true) Cart.setItem(cartItem.product, 0);
  }

  function onBeforeQuantityChange(value: number) {
    if (value <= 0) {
      confirmRemoveModal.showOverlay();
      return false;
    }
  }

  function onQuantityChange(value: number) {
    quantity = value;
    Cart.setItem(cartItem.product, quantity);
  }

  const store = Cart.getCartStore();

  // subscribe to cart store
  store.subscribe(() => {
    cartItem = Cart.getItem(product);
    if (cartItem?.product) {
      product = cartItem.product;
      available = cartItem.available;
      quantity = cartItem.quantity;
    }
  });
</script>

{#if cartItem}
  <ConfirmModal
    bind:this={confirmRemoveModal}
    title={"Are you sure want to remove this item?"}
    callback={onConfirmRemove}
  />

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
        value={available ? cartItem.quantity : 0}
        onBeforeChange={onBeforeQuantityChange}
        onChange={onQuantityChange}
        disabled={available === false}
        max={product.stock}
      />
    </div>

    <div class="flex basis-2/12 justify-center items-center">
      <h1>{cartItem.product.price * cartItem.quantity}</h1>
    </div>

    <div class="flex basis-2/12 justify-center items-center">
      <button type="button" class="underline" on:click={onRemoveClick}>
        Remove
      </button>
    </div>
  </div>
{/if}
