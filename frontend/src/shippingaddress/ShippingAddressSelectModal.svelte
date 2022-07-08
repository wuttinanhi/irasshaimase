<script lang="ts">
  import { onMount } from "svelte";

  import {
    IShippingAddress,
    ShippingAddressAPI,
  } from "../api/shipping-address.api";
  import ShippingAddressAddButton from "./ShippingAddressAddButton.svelte";

  export let show: boolean = false;
  export let selectedLocation: IShippingAddress = null;
  export let callback: (result: IShippingAddress) => void = null;

  const api = new ShippingAddressAPI();
  let loaded = false;
  let locations: IShippingAddress[] = [];

  export function showOverlay() {
    show = true;
    document.body.style.overflow = "hidden";
  }

  export function hideOverlay() {
    show = false;
    document.body.style.overflow = "auto";
  }

  // hide overlay when esc key pressed
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideOverlay();
  });

  async function load() {
    locations = await api.getAll();
    selectedLocation = locations.filter((loc) => loc.default === true)[0];
    loaded = true;
    if (selectedLocation && callback) callback(selectedLocation);
  }

  function onClick(index: number) {
    selectedLocation = locations[index];
    hideOverlay();
    if (callback) callback(selectedLocation);
  }

  onMount(() => {
    load();
  });
</script>

{#if show && loaded === true}
  <div
    tabindex="-1"
    aria-hidden="true"
    class="z-50 flex fixed w-full h-screen bg-black bg-opacity-60 inset-0"
  >
    <div class="md:mx-auto md:my-auto px-0">
      <div
        class="flex flex-col bg-white py-5 px-3 space-y-2 h-full w-full md:h-[60vh] md:w-[20vw]"
        on:click={(e) => e.stopPropagation()}
      >
        <div class="flex my-3 justify-between">
          <h1 class="flex text-lg font-bold">Select Shipping Address</h1>

          <div class="flex shrink h-fit">
            <button
              on:click={hideOverlay}
              class="text-lg text-gray-400 font-bold"
            >
              🗙
            </button>
          </div>
        </div>

        <div
          class="flex flex-col h-full overflow-y-auto overflow-x-clip space-y-3"
        >
          {#each locations as loc, index}
            <div
              class="flex 
              border-2 p-2 
              {loc.id === selectedLocation.id ? 'border-blue-600' : null}
              "
              on:click={() => onClick(index)}
            >
              <p class="whitespace-pre-wrap">
                {api.toHumanReadable(loc)}
              </p>
            </div>
          {/each}
        </div>

        <div class="flex flex-row justify-center">
          <ShippingAddressAddButton callback={load} />
        </div>
      </div>
    </div>
  </div>
{/if}
