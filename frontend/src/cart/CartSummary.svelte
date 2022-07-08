<script lang="ts">
  import type { INotAvailableProductResponse } from "../api/cart.api";

  import { OrderAPI } from "../api/order.api";
  import { PaymentAPI } from "../api/payment.api";
  import ConfirmModal from "../common/ConfirmModal.svelte";
  import { userStore } from "../user/user.store";
  import { Cart } from "./cart";

  let alertModal: ConfirmModal;
  let alertModalMsg: string = "";

  let isLoggedin = $userStore ? true : false;
  let checkoutDisabled = false;

  const cartStore = Cart.getCartStore();
  let cartTotal = Cart.getTotal();
  let cartData = $cartStore;

  Cart.getCartStore().subscribe(() => {
    cartTotal = Cart.getTotal();
    cartData = $cartStore;
  });

  async function checkout() {
    try {
      // disable checkout button
      checkoutDisabled = true;
      // create order
      const orderApi = new OrderAPI();
      const orderCreateResult = await orderApi.createOrder(cartData);
      // pay order
      const paymentApi = new PaymentAPI();
      const payResult = await paymentApi.pay(orderCreateResult.order.id);
      // empty cart
      Cart.emptyCart();
      // redirect to pay url
      window.location.href = payResult.payUrl;
    } catch (error) {
      const err = error as INotAvailableProductResponse;
      alertModalMsg = "Please remove the following items from cart: \n";
      for (const product of err.products) {
        if (product.available === true) continue;
        alertModalMsg += `${product.name} \n`;
      }
      alertModal.showOverlay();
    } finally {
      // delay 5 seconds before enable checkout button
      setTimeout(() => {
        checkoutDisabled = false;
      }, 3000);
    }
  }
</script>

<ConfirmModal
  title="The following products are not available:"
  message={alertModalMsg}
  bind:this={alertModal}
/>

<div class="flex flex-col w-full bg-gray-50 px-5 py-5 border-y-2">
  <div class="flex py-5"><h1 class="font-bold text-lg">Summary</h1></div>

  <div class="flex justify-between py-2">
    <h1>Subtotal</h1>
    <h1>${cartTotal}</h1>
  </div>

  <!-- temporary disabled -->
  <!-- <div class="flex justify-between py-2 items-center">
    <h1>Discount</h1>
    <input
      type="text"
      name="discount"
      id=""
      class="p-1 rounded-md text-center"
      placeholder="Discount code"
    />
  </div> -->

  <div class="flex justify-between py-2 font-bold">
    <h1>Total</h1>
    <h1>${cartTotal}</h1>
  </div>

  <div class="flex justify-between pt-6">
    {#if isLoggedin === true}
      {#if cartData.items.length >= 1}
        <button
          type="button"
          class="w-full py-5 font-bold text-white {checkoutDisabled
            ? 'bg-blue-400'
            : 'bg-blue-600'}"
          disabled={checkoutDisabled}
          on:click={checkout}
        >
          {checkoutDisabled ? "Processing..." : "Checkout"}
        </button>
      {:else}
        <button
          type="button"
          class="w-full py-5 font-bold text-white bg-blue-400"
        >
          Cart is empty
        </button>
      {/if}
    {:else}
      <a
        href="/login"
        class="w-full py-5 font-bold text-white bg-blue-400 text-center"
      >
        Please Login to Checkout
      </a>
    {/if}
  </div>
</div>
