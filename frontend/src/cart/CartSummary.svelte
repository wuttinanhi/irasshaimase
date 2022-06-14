<script lang="ts">
  import { OrderAPI } from "../api/order.api";
  import { Cart } from "./cart";

  let checkoutDisabled = false;

  const cartStore = Cart.getCartStore();
  let cartTotal = Cart.getToal();
  let cartData = $cartStore;

  Cart.getCartStore().subscribe(() => {
    cartTotal = Cart.getToal();
    cartData = $cartStore;
  });

  async function checkout() {
    try {
      checkoutDisabled = true;
      const api = new OrderAPI();
      const response = await api.createOrder(cartData);
      if (!response?.payUrl) throw new Error("Checkout failed");
      const payUrl = response.payUrl;
      window.location.href = payUrl;
    } catch (error) {
      alert(error);
    } finally {
      // delay 5 seconds before enable checkout button
      setTimeout(() => {
        checkoutDisabled = false;
      }, 3000);
    }
  }
</script>

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
  </div>
</div>
