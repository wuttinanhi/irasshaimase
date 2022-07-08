<script lang="ts">
  import type { IOrder } from "../api/order.api";
  import { ReceiptAPI } from "../api/receipt.api";

  export let order: IOrder;
  const receiptApi = new ReceiptAPI();
  let disabled = false;

  async function downloadReceipt() {
    try {
      disabled = true;
      await receiptApi.downloadReceipt(order.id);
    } catch (error) {
      alert("Fail to download receipt");
    } finally {
      setTimeout(() => {
        disabled = false;
      }, 5000);
    }
  }
</script>

{#if order}
  <button
    type="button"
    class="
    flex py-2 px-10  
    {disabled ? 'bg-blue-400' : 'bg-blue-600'}  
    text-white font-bold md:text-lg"
    {disabled}
    on:click={downloadReceipt}
  >
    Download Receipt
  </button>
{/if}
