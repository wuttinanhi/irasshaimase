<script lang="ts">
  import { onMount } from "svelte";

  import type { IAPIError } from "../api/base.api";
  import {
    IShippingAddress,
    ShippingAddressAPI,
  } from "../api/shipping-address.api";

  const api = new ShippingAddressAPI();

  export let showing = false;
  export let id: number = null;
  export let mode = "add";
  export let callback: (result: IShippingAddress) => void = null;

  export let data: IShippingAddress = {};
  let firstname: string = data.firstname;
  let lastname: string = data.lastname;
  let houseNumber: string = data.houseNumber;
  let alley: string = data.alley;
  let lane: string = data.lane;
  let street: string = data.street;
  let subArea: string = data.subArea;
  let district: string = data.district;
  let province: string = data.province;
  let postalCode: number = data.postalCode;
  let phoneNumber: string = data.phoneNumber;
  let info: string = data.info;
  let primary: boolean = data.default;

  let errorMessage: string = null;

  export function showOverlay() {
    showing = true;
    document.body.style.overflow = "hidden";
  }

  export function hideOverlay() {
    showing = false;
    document.body.style.overflow = "auto";
  }

  // hide overlay when esc key pressed
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideOverlay();
  });

  // on submit button click
  async function onButtonClick() {
    data = {
      firstname,
      lastname,
      houseNumber,
      alley,
      lane,
      street,
      subArea,
      district,
      province,
      postalCode: +postalCode,
      phoneNumber,
      info,
      default: primary,
    };

    try {
      errorMessage = null;
      if (mode === "add") {
        await api.add(data);
      } else if (mode === "update") {
        await api.update(id, data);
      }
      if (callback) {
        data.id = id;
        callback(data);
      }
      hideOverlay();
    } catch (error) {
      const err = error as IAPIError;
      let messages: string[] = err.data.message;
      messages = messages.slice(0, 6);
      errorMessage = messages.join("\n");
    }
  }

  onMount(() => {
    errorMessage = null;
  });
</script>

{#if showing === true}
  <div
    tabindex="-1"
    aria-hidden="true"
    class="z-50 flex fixed w-full h-screen bg-black bg-opacity-60 inset-0"
  >
    <div class="md:mx-auto md:my-auto px-0">
      <div
        class="flex flex-col bg-white p-5 space-y-2 h-full md:h-fit"
        on:click={(e) => e.stopPropagation()}
      >
        <div class="flex my-3 justify-between">
          <h1 class="flex text-lg font-bold">
            {mode === "add"
              ? "New Shipping Address"
              : "Update Shipping Address"}
          </h1>

          <div class="flex shrink h-fit">
            <button
              on:click={hideOverlay}
              class="text-lg text-gray-400 font-bold"
            >
              🗙
            </button>
          </div>
        </div>

        <div class="flex my-2 w-full">
          {#if errorMessage !== null}
            <p class="text-red-500 text-sm">{errorMessage}</p>
          {/if}
        </div>

        <div class="flex space-x-2 w-full">
          <input
            type="text"
            placeholder="Firstname"
            class="w-full p-2 border-2"
            bind:value={firstname}
          />
          <input
            type="text"
            placeholder="Lastname"
            class="w-full p-2 border-2"
            bind:value={lastname}
          />
        </div>

        <div class="flex space-x-2 w-full">
          <input
            type="text"
            placeholder="House No."
            class="w-full p-2 border-2"
            bind:value={houseNumber}
          />
          <input
            type="text"
            placeholder="Alley"
            class="w-full p-2 border-2"
            bind:value={alley}
          />
        </div>

        <div class="flex space-x-2 w-full">
          <input
            type="text"
            placeholder="Lane"
            class="w-full p-2 border-2"
            bind:value={lane}
          />
          <input
            type="text"
            placeholder="Street"
            class="w-full p-2 border-2"
            bind:value={street}
          />
        </div>

        <div class="flex space-x-2 w-full">
          <input
            type="text"
            placeholder="Sub Area"
            class="w-full p-2 border-2"
            bind:value={subArea}
          />
          <input
            type="text"
            placeholder="District"
            class="w-full p-2 border-2"
            bind:value={district}
          />
        </div>

        <div class="flex space-x-2 w-full">
          <input
            type="text"
            placeholder="City"
            class="w-full p-2 border-2"
            bind:value={province}
          />
          <input
            type="text"
            placeholder="Postal Code"
            class="w-full p-2 border-2"
            bind:value={postalCode}
          />
        </div>

        <div class="flex space-x-2 w-full">
          <input
            type="text"
            placeholder="Phone Number"
            class="w-full p-2 border-2"
            bind:value={phoneNumber}
          />
        </div>

        <div class="flex space-x-2 w-full">
          <textarea
            placeholder="More information"
            rows="5"
            class="w-full p-2 border-2"
            bind:value={info}
          />
        </div>

        <div class="flex space-x-2 w-full py-3">
          <input type="checkbox" class="w-5 h-5" bind:checked={primary} />
          <span class="text-sm">Set as default address</span>
        </div>

        <div class="flex w-full justify-center mt-5">
          <button
            type="button"
            class="flex bg-blue-600 px-6 py-3 text-white font-bold"
            on:click={onButtonClick}
          >
            {mode === "add" ? "Add" : "Update"}
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
