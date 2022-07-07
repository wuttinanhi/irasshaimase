<script lang="ts">
  import type { IPayment } from "../api/payment.api";
  import { formatDate } from "../etc/helper";

  export let data: IPayment[];
</script>

<div class="w-full">
  <div class="w-full overflow-x-auto">
    <div class="table-header-row">
      <div class="table-cell font-bold">Payment ID</div>
      <div class="table-cell font-bold">Status</div>
      <div class="table-cell font-bold table-cell-extended">Date</div>
      <div class="table-cell font-bold">Method</div>
      <div class="table-cell font-bold">Amount</div>
    </div>

    {#if data.length > 0}
      {#each data as row}
        <div class="table-row">
          <div class="table-cell">{row.id}</div>
          <div class="table-cell">{row.status}</div>
          <div class="table-cell table-cell-extended">
            {formatDate(row.createdAt)}
          </div>
          <div class="table-cell">{row.paymentMethod}</div>
          <div class="table-cell">{row.amount}</div>
        </div>
      {/each}
    {:else}
      <h1 class="w-full text-center text-xl italic">Not Found</h1>
    {/if}
  </div>
</div>

<style lang="postcss">
  .table-header-row {
    @apply flex flex-row border-2 w-full px-5 py-3 justify-center bg-gray-50;
  }

  .table-row {
    @apply flex flex-row border-b-2 border-x-2 w-full px-5 py-3 justify-center bg-gray-50;
  }

  .table-cell {
    @apply flex flex-grow basis-1/5 justify-center items-center;
  }

  .table-cell-extended {
    @apply basis-2/12;
  }
</style>
