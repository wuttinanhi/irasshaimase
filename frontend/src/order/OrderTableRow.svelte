<script lang="ts">
  import type { IOrderItem } from "../api/order.api";
  import { PLACEHOLDER_IMAGE } from "../etc/mock";

  export let orderItem: IOrderItem;
</script>

<div
  class="flex flex-row border-b-2 w-full px-5 py-5 justify-center bg-gray-50"
>
  <div class="basis-3/12 flex-grow flex justify-center">
    <div class="flex flex-col sm:flex-row w-full justify-center items-center">
      <div class="flex sm:basis-1/2 justify-center">
        <img
          src={orderItem.image ?? PLACEHOLDER_IMAGE}
          alt={orderItem.name}
          class="flex object-fill w-20 h-20"
        />
      </div>

      <div class="flex sm:basis-1/2 justify-start truncate">
        <h1>{orderItem.name}</h1>
      </div>
    </div>
  </div>

  <div class="basis-3/12 flex-grow flex justify-center items-center">
    <h1>{orderItem.price}</h1>
  </div>

  <div class="basis-3/12 flex-grow flex justify-center items-center">
    <h1>{orderItem.quantity}</h1>
  </div>

  <div class="basis-3/12 flex-grow flex justify-center items-center">
    <h1>{orderItem.price * orderItem.quantity}</h1>
  </div>
</div>
