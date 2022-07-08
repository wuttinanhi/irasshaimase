<script lang="ts">
  import { onMount } from "svelte";

  import {
    IShippingAddress,
    ShippingAddressAPI,
  } from "../api/shipping-address.api";
  import ShippingAddressAddButton from "./ShippingAddressAddButton.svelte";
  import ShippingAddressRow from "./ShippingAddressRow.svelte";

  const api = new ShippingAddressAPI();
  let addresses: IShippingAddress[] = [];

  async function load() {
    const response = await api.getAll();
    addresses = response;
  }

  onMount(() => {
    load();
  });
</script>

<div class="flex flex-col w-full">
  <div class="flex">
    <h1 class="font-bold text-xl">Shipping Address</h1>
  </div>

  <div class="flex flex-col my-10 space-y-5 w-full">
    {#each addresses as data, i}
      <ShippingAddressRow {data} rowId={i + 1} onChange={load} />
    {/each}
  </div>

  <div class="flex flex-row w-full justify-center">
    <ShippingAddressAddButton callback={load} />
  </div>
</div>
