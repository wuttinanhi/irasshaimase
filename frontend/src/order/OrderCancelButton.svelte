<script lang="ts">
  import { IOrder, OrderAPI } from "../api/order.api";
  import ConfirmModal from "../common/ConfirmModal.svelte";

  export let order: IOrder;
  const orderApi = new OrderAPI();

  let confirmModal: ConfirmModal;
  let disabled = false;
  let errorMessage = null;

  async function modalCallback(result: boolean) {
    if (result !== true) return;
    try {
      errorMessage = null;
      disabled = true;
      await orderApi.cancel(order.id);
      window.location.reload();
    } catch (error) {
      errorMessage = "Fail to cancel order";
    } finally {
      setTimeout(() => {
        disabled = false;
      }, 3000);
    }
  }
</script>

{#if order && order.status === "PENDING"}
  <ConfirmModal
    bind:this={confirmModal}
    title="Canceling order"
    message="Are you sure want to cancel order #{order.id}"
    callback={modalCallback}
  />

  <div class="flex flex-col">
    <button
      type="button"
      class="
        flex py-2 px-10  {disabled
        ? 'bg-red-400'
        : 'bg-red-600'}  text-white font-bold md:text-lg
      "
      {disabled}
      on:click={() => {
        confirmModal.showOverlay();
      }}
    >
      Cancel Order
    </button>

    {#if errorMessage}
      <p class="text-red-500">{errorMessage}</p>
    {/if}
  </div>
{/if}
