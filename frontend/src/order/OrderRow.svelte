<script lang="ts">
  import { navigate } from "svelte-routing";
  import { IOrder, IOrderReport, OrderAPI } from "../api/order.api";
  import { PaymentAPI } from "../api/payment.api";
  import { PLACEHOLDER_IMAGE } from "../etc/mock";

  const orderApi = new OrderAPI();
  const paymentApi = new PaymentAPI();

  export let orderData: IOrder;
  let orderReport: IOrderReport;

  let payDisabled = false;

  async function load() {
    const result = await orderApi.report(orderData.id);
    orderReport = result;
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
    <div class="flex flex-col w-full px-5 py-3">
      <div class="flex flex-row justify-between my-2 w-full">
        <div class="flex flex-col">
          <h1 class="flex text-xl">
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

      <div
        class="flex flex-row justify-start w-full mt-2 space-x-2 overflow-x-auto overflow-y-hidden py-5"
      >
        {#if orderReport}
          {#each orderReport.orderItems as orderItem}
            <img
              src={orderItem.image || PLACEHOLDER_IMAGE}
              class="flex w-20 h-20"
              alt={orderItem.name}
            />
          {/each}
        {/if}
      </div>
    </div>

    <div
      class="flex flex-row justify-end items-center w-full mt-2 space-x-4 border-t-2 bg-gray-50 px-5 py-3"
      on:click={(e) => e.stopPropagation()}
    >
      <div class="flex">
        <h1 class="flex text-xl">Total ${orderData.total}</h1>
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
