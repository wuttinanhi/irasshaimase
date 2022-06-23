<script lang="ts">
  import type { IShippingAddress } from "../api/shipping-address.api";
  import ShippingAddressModal from "./ShippingAddressModal.svelte";

  export let rowId: number = null;
  export let data: IShippingAddress = null;
  export let onChange: () => void = null;

  function updateData(result: IShippingAddress) {
    data = result;
    if (onChange) onChange();
  }

  let modal: ShippingAddressModal;
</script>

<ShippingAddressModal
  bind:this={modal}
  mode="update"
  id={data.id}
  {data}
  callback={updateData}
/>
<div class="flex flex-row border-2 w-full px-5 py-3 space-x-5">
  <div class="flex flex-col basis-5/6 my-2">
    <h1 class="flex">
      <h1 class="flex font-bold text-lg">Address {rowId}</h1>

      {#if data.default}
        <span
          class="ml-2 py-1 px-2 inline bg-blue-500 text-sm text-white rounded-md"
        >
          Default
        </span>
      {/if}
    </h1>

    <h1 class="flex">
      {data.firstname + " " + data.lastname}
    </h1>

    <h1 class="flex">
      {data.houseNumber}
      {data.alley}
      {data.lane}
      {data.street}
    </h1>

    <h1 class="flex">
      {data.subArea}
      {data.district}
      {data.province}
      {data.postalCode}
    </h1>
  </div>

  <div class="flex flex-col basis-1/6 justify-center items-center">
    <button
      type="button"
      class="flex"
      on:click={() => {
        modal.showOverlay();
      }}
    >
      Edit
    </button>
  </div>
</div>
