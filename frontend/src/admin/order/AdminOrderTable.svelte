<script lang="ts">
  import { Link } from "svelte-routing";
  import type { IOrder } from "../../api/order.api";
  import { formatDate } from "../../etc/helper";

  export let data: IOrder[];
</script>

<div class="w-full">
  <div class="w-full overflow-x-auto">
    <div class="table-header-row">
      <div class="table-cell">Order ID</div>
      <div class="table-cell">User</div>
      <div class="table-cell table-cell-extended">Create Date</div>
      <div class="table-cell">Total</div>
      <div class="table-cell">Status</div>
      <div class="table-cell">Action</div>
    </div>

    {#if data.length > 0}
      {#each data as row}
        <div class="table-row">
          <div class="table-cell">{row.id}</div>
          <div class="table-cell">{row.userId}</div>
          <div class="table-cell table-cell-extended">
            {formatDate(row.createdAt)}
          </div>
          <div class="table-cell">{row.total}</div>
          <div class="table-cell">{row.status}</div>
          <div class="table-cell">
            <Link
              to="/order/{row.id}"
              class="bg-blue-500 text-white font-bold py-1 px-3"
            >
              Details
            </Link>
          </div>
        </div>
      {/each}
    {:else}
      <h1 class="w-full text-center text-xl italic">Not Found</h1>
    {/if}
  </div>
</div>

<style type="postcss">
  .table-header-row {
    @apply flex flex-row border-2 w-full px-5 py-3 justify-center bg-gray-50;
  }

  .table-row {
    @apply flex flex-row border-b-2 border-x-2 w-full px-5 py-3 justify-center bg-gray-50;
  }

  .table-cell {
    @apply flex flex-grow basis-1/12 justify-center items-center;
  }

  .table-cell-extended {
    @apply basis-2/12;
  }
</style>
