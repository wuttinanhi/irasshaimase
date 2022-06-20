<script lang="ts">
  import type { IOrderReportItem } from "../api/order.api";
  import { PLACEHOLDER_IMAGE } from "../etc/mock";

  export let orderItemData: IOrderReportItem;
</script>

<div
  class="flex flex-row border-x-2 border-b-2 w-full px-5 py-5 justify-center bg-gray-50"
>
  <div class="basis-3/12 flex-grow flex justify-center">
    <div class="flex flex-col sm:flex-row w-full justify-center items-center">
      <div class="flex sm:basis-1/2 justify-center">
        <img
          src={orderItemData.image ?? PLACEHOLDER_IMAGE}
          alt={orderItemData.name}
          class="flex object-fill w-20 h-20"
        />
      </div>

      <div class="flex sm:basis-1/2 justify-start truncate">
        <h1>{orderItemData.name}</h1>
      </div>
    </div>
  </div>

  <div class="basis-3/12 flex-grow flex justify-center items-center">
    <h1>{orderItemData.price}</h1>
  </div>

  <div class="basis-3/12 flex-grow flex justify-center items-center">
    <h1>{orderItemData.quantity}</h1>
  </div>

  <div class="basis-3/12 flex-grow flex justify-center items-center">
    <h1>{orderItemData.price * orderItemData.quantity}</h1>
  </div>
</div>
