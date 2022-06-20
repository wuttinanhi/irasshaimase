<script lang="ts">
  import {
    IShippingAddress,
    ShippingAddressAPI,
  } from "../api/shipping-address.api";
  import ShippingAddressModal from "./ShippingAddressModal.svelte";
  import ShippingAddressRow from "./ShippingAddressRow.svelte";

  const api = new ShippingAddressAPI();
  let addresses: IShippingAddress[] = [];

  let modal: ShippingAddressModal;

  async function load() {
    const response = await api.getAll();
    addresses = response;
  }

  load();
</script>

<ShippingAddressModal bind:this={modal} mode="add" />

<div class="flex flex-col w-full">
  <div class="flex">
    <h1 class="font-bold text-xl">Shipping Address</h1>
  </div>

  <div class="flex flex-col my-10 space-y-5 w-full">
    {#each addresses as data, i}
      <ShippingAddressRow {data} rowId={i + 1} />
    {/each}
  </div>

  <div class="flex w-full justify-center">
    <button
      type="button"
      class="flex bg-blue-600 px-6 py-3 text-white font-bold"
      on:click={() => {
        modal.showOverlay();
      }}
    >
      Add new address
    </button>
  </div>
</div>
