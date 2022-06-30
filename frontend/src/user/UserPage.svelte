<script lang="ts">
  import Footer from "../common/Footer.svelte";
  import Navbar from "../common/Navbar.svelte";
  import ShippingAddressPanel from "../shippingaddress/ShippingAddressPanel.svelte";
  import ChangePasswordPanel from "./ChangePasswordPanel.svelte";
  import { EUserPanel } from "./user-panel.enum";

  let panel: EUserPanel = EUserPanel.SHIPPING_ADDRESS;

  function changePanel(to: EUserPanel) {
    panel = to;
  }
</script>

<Navbar />

<div class="flex flex-col px-3 lg:pt-8 lg:px-32 2xl:pt-8 2xl:px-96">
  <div class="flex my-10">
    <h1 class="text-4xl font-bold">Account</h1>
  </div>

  <div class="flex flex-col w-full md:flex-row md:mt-10 md:space-x-10">
    <div class="flex space-y-5 mb-10 flex-col w-full md:basis-1/6">
      <button
        class="flex text-left"
        on:click={() => changePanel(EUserPanel.SHIPPING_ADDRESS)}
      >
        Shipping Address
      </button>

      <button
        class="flex text-left"
        on:click={() => changePanel(EUserPanel.CHANGE_PASSWORD)}
      >
        Change Password
      </button>

      <a class="flex text-left" href="/logout">Logout</a>
    </div>

    <div class="flex w-full md:basis-5/6 md:border-l-2">
      <div class="flex md:ml-5 w-full">
        {#if panel === EUserPanel.SHIPPING_ADDRESS}
          <ShippingAddressPanel />
        {/if}
        {#if panel === EUserPanel.CHANGE_PASSWORD}
          <div class="flex flex-col md:basis-1/2 w-full">
            <ChangePasswordPanel />
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<Footer />
