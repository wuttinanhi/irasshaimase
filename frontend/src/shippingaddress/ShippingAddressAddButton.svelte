<script lang="ts">
  import { ShippingAddressAPI } from "../api/shipping-address.api";
  import ShippingAddressModal from "./ShippingAddressModal.svelte";

  const api = new ShippingAddressAPI();
  export let callback: () => void;
  let modal: ShippingAddressModal;
</script>

<ShippingAddressModal bind:this={modal} mode="add" {callback} />

<button
  type="button"
  class="flex bg-blue-600 px-6 py-3 text-white font-bold text-center"
  on:click={() => {
    modal.showOverlay();
  }}
>
  Add new address
</button>
