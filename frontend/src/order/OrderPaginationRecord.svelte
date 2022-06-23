<script lang="ts">
  import { navigate } from "svelte-routing";
  import { IOrder, IOrderReport, OrderAPI } from "../api/order.api";
  import { PaymentAPI } from "../api/payment.api";
  import OrderTableFooter from "./OrderTableFooter.svelte";
  import OrderTableHeader from "./OrderTableHeader.svelte";
  import OrderTableRow from "./OrderTableRow.svelte";

  const ITEM_DISPLAY_LIMIT = 3;
  let ITEM_HIDDEN_COUNT = 0;

  const orderApi = new OrderAPI();
  const paymentApi = new PaymentAPI();

  export let orderData: IOrder;
  let orderReport: IOrderReport;

  let payDisabled = false;

  async function load() {
    const result = await orderApi.report(orderData.id);
    orderReport = result;
    ITEM_HIDDEN_COUNT = orderReport.orderItems.length - ITEM_DISPLAY_LIMIT;
  }

  async function pay() {
    try {
      payDisabled = true;
      const result = await paymentApi.pay(orderReport.id);
      window.location.href = result.payUrl;
    } catch (error) {
      alert("Payment failed");
    } finally {
      setTimeout(() => {
        payDisabled = false;
      }, 3000);
    }
  }

  async function onClick() {
    navigate(`/order/${orderReport.id}`);
  }

  load();
</script>

{#if orderReport}
  <div class="flex flex-col border-2 w-full" on:click={onClick}>
    <div class="flex flex-col w-full">
      <div class="flex flex-row justify-between w-full py-5 px-5">
        <div class="flex flex-col">
          <h1 class="flex text-xl font-bold">
            Order {orderReport.id}
            ({new Date(orderData.createdAt).toLocaleDateString()})
          </h1>
        </div>

        <div class="flex flex-row space-x-3">
          <div class="flex">
            <h1 class="text-lg text-blue-500 font-bold">
              {orderReport.status}
            </h1>
          </div>
        </div>
      </div>

      <OrderTableHeader />
      {#each orderReport.orderItems.slice(0, ITEM_DISPLAY_LIMIT) as orderItem}
        <OrderTableRow orderItemData={orderItem} />
      {/each}
      {#if ITEM_HIDDEN_COUNT >= 1}
        <OrderTableFooter moreItemCount={ITEM_HIDDEN_COUNT} />
      {/if}
    </div>

    <div
      class="flex flex-row justify-end items-center w-full space-x-4 bg-white px-5 py-3"
      on:click={(e) => e.stopPropagation()}
    >
      <div class="flex">
        <h1 class="flex text-xl font-bold">Total ${orderData.total}</h1>
      </div>

      {#if orderReport.status === "PENDING"}
        <div class="flex">
          <button
            type="button"
            class="flex py-2 px-10 
            {payDisabled ? 'bg-blue-400' : 'bg-blue-600'} 
            text-white font-bold text-lg"
            disabled={payDisabled}
            on:click={pay}
          >
            Pay
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}
