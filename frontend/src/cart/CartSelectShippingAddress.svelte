<script lang="ts">
  import {
    IShippingAddress,
    ShippingAddressAPI,
  } from "../api/shipping-address.api";
  import ShippingAddressSelectModal from "../shippingaddress/ShippingAddressSelectModal.svelte";
  import { Cart } from "./cart";

  const api = new ShippingAddressAPI();
  let shippingAddressSelectModal: ShippingAddressSelectModal = null;
  let selectedLocation: IShippingAddress = null;

  async function onEditShippingAddress() {
    shippingAddressSelectModal.showOverlay();
  }

  async function onSelectedShippingAddress(selected: IShippingAddress) {
    Cart.setShippingAddressId(selected.id);
  }
</script>

<ShippingAddressSelectModal
  bind:this={shippingAddressSelectModal}
  bind:selectedLocation
  callback={onSelectedShippingAddress}
/>

<div class="flex flex-col w-full bg-gray-50 px-5 py-5 border-y-2">
  <div class="flex justify-between">
    <h1 class="font-bold text-lg">Shipping Location</h1>
    <button type="button" class="underline" on:click={onEditShippingAddress}>
      Edit
    </button>
  </div>

  <div class="flex justify-between mt-2">
    <h1 class="whitespace-pre-wrap">
      {selectedLocation ? api.toHumanReadable(selectedLocation) : ""}
    </h1>
  </div>
</div>
