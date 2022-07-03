<script lang="ts">
  import { Link } from "svelte-routing";
  import type { IPayment } from "../api/payment.api";
  import { formatDate } from "../etc/helper";
  export let data: IPayment = null;
</script>

{#if data}
  <div
    class="flex flex-row border-b-2 border-x-2 w-full px-5 py-3 justify-center bg-gray-50"
  >
    <div class="flex basis-1 flex-grow justify-center">
      <h1>{data.id}</h1>
    </div>

    <div class="flex basis-1 flex-grow justify-center">
      <h1>{data.orderId}</h1>
    </div>

    <div class="flex basis-1 flex-grow justify-center">
      <h1>{data.amount}</h1>
    </div>

    <div class="flex basis-1 flex-grow justify-center">
      <h1>{data.status}</h1>
    </div>

    <div class="flex basis-3 flex-grow justify-center">
      <h1>{formatDate(data.createdAt)}</h1>
    </div>

    <div class="flex basis-1 flex-grow justify-center">
      <h1>{data.paymentMethod}</h1>
    </div>

    <div class="flex basis-1 flex-grow justify-center">
      <Link
        to="/order/{data.orderId}"
        class="bg-blue-500 text-white font-bold py-1 px-3"
      >
        Details
      </Link>
    </div>
  </div>
{/if}
