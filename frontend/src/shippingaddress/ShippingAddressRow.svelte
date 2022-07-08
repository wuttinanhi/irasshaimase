<script lang="ts">
  import {
    IShippingAddress,
    ShippingAddressAPI,
  } from "../api/shipping-address.api";
  import ConfirmModal from "../common/ConfirmModal.svelte";
  import ShippingAddressModal from "./ShippingAddressModal.svelte";

  export let rowId: number = null;
  export let data: IShippingAddress = null;
  export let onChange: () => void = null;

  const api = new ShippingAddressAPI();

  let addModal: ShippingAddressModal;
  let deleteModal: ConfirmModal;

  function updateData(result: IShippingAddress) {
    data = result;
    if (onChange) onChange();
  }

  async function deleteModalCallback(result: boolean) {
    if (result) {
      await api.delete(data.id);
      if (onChange) onChange();
    }
  }
</script>

<ConfirmModal
  title="Delete Shipping Address"
  message="Are you sure you want to delete this shipping address?"
  bind:this={deleteModal}
  callback={deleteModalCallback}
/>

<ShippingAddressModal
  bind:this={addModal}
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

  <div class="flex flex-row basis-1/6 justify-center items-center space-x-3">
    <button
      type="button"
      class="flex underline"
      on:click={() => {
        addModal.showOverlay();
      }}
    >
      Edit
    </button>
    <button
      type="button"
      class="flex underline"
      on:click={() => {
        deleteModal.showOverlay();
      }}
    >
      Delete
    </button>
  </div>
</div>
