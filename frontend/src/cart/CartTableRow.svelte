<script lang="ts">
  import ConfirmModal from "../common/ConfirmModal.svelte";
  import { Cart } from "./cart";
  import type { ICartItem } from "./cart.interface";

  export let cartItem: ICartItem;
  export let callback: () => void = null;

  let confirmRemoveModal: ConfirmModal;
  let quantity = cartItem.quantity;

  function onConfirmRemove(result: boolean) {
    if (result === true) Cart.setItem(cartItem.product, 0);
    if (callback) callback();
  }

  function onQuantityChange() {
    if (quantity <= 0) {
      quantity = 1;
      confirmRemoveModal.showOverlay();
    } else {
      Cart.setItem(cartItem.product, quantity);
      if (callback) callback();
    }
  }
</script>

{#if cartItem}
  <ConfirmModal
    bind:this={confirmRemoveModal}
    title={"Are you sure want to remove this item?"}
    callback={onConfirmRemove}
  />

  <div class="flex py-5 border-t-2 bg-gray-50">
    <div class="flex basis-4/12 justify-center">
      <div
        class="flex flex-col sm:flex-row w-full justify-center items-center align-middle"
      >
        <div class="flex sm:basis-1/2 justify-center">
          <img
            src={cartItem.product.image}
            alt=""
            class="flex object-fill w-20 h-20"
          />
        </div>

        <div
          class="flex sm:basis-1/2 justify-start align-middle overflow-hidden"
        >
          <p
            class="truncate 
            {cartItem.available ? '' : 'text-red-500 font-bold'}"
          >
            {`
              ${cartItem.available === false ? "(Not Available)" : ""} 
              ${cartItem.product.name}
            `}
          </p>
        </div>
      </div>
    </div>

    <div class="flex basis-2/12 justify-center items-center">
      <h1>{cartItem.product.price}</h1>
    </div>

    <div class="flex basis-2/12 flex-row justify-center items-center">
      <input
        class="flex shrink text-center text-xl w-1/3"
        type="number"
        bind:value={quantity}
        on:change={onQuantityChange}
        max={cartItem.product.stock}
      />
    </div>

    <div class="flex basis-2/12 justify-center items-center">
      <h1>{cartItem.product.price * cartItem.quantity}</h1>
    </div>

    <div class="flex basis-2/12 justify-center items-center">
      <button
        type="button"
        class="underline"
        on:click={() => confirmRemoveModal.showOverlay()}
      >
        Remove
      </button>
    </div>
  </div>
{/if}
