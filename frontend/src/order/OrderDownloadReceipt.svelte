<script lang="ts">
  import type { IOrder } from "../api/order.api";
  import { ReceiptAPI } from "../api/receipt.api";

  export let order: IOrder;
  const receiptApi = new ReceiptAPI();
  let disabled = false;
  let errorMessage = null;

  async function downloadReceipt() {
    try {
      errorMessage = null;
      disabled = true;
      await receiptApi.downloadReceipt(order.id);
    } catch (error) {
      errorMessage = "Fail to download receipt";
    } finally {
      setTimeout(() => {
        disabled = false;
      }, 5000);
    }
  }
</script>

{#if order}
  <div class="flex flex-col">
    <button
      type="button"
      class="
        flex py-2 px-10  
        {disabled ? 'bg-blue-400' : 'bg-blue-600'}  
        text-white font-bold md:text-lg
      "
      {disabled}
      on:click={downloadReceipt}
    >
      Download Receipt
    </button>

    {#if errorMessage}
      <p class="text-red-500">{errorMessage}</p>
    {/if}
  </div>
{/if}
