<script lang="ts">
  import { onMount } from "svelte";

  import { IOrderReport, OrderAPI } from "../api/order.api";
  import Footer from "../common/Footer.svelte";
  import Navbar from "../common/Navbar.svelte";
  import OrderPayButton from "./OrderPayButton.svelte";
  import OrderReportPayment from "./OrderReportPayment.svelte";
  import OrderReportRow from "./OrderReportRow.svelte";

  const orderApi = new OrderAPI();

  export let orderId: number;
  let orderReport: IOrderReport;

  async function load() {
    const result = await orderApi.report(orderId);
    orderReport = result;
  }

  onMount(() => {
    load();
  });
</script>

<Navbar />

<div class="flex flex-col px-3 lg:pt-8 lg:px-32 2xl:pt-8 2xl:px-96">
  {#if orderReport}
    <div class="flex flex-row justify-between lg:flex-row  mt-10 w-full">
      <div class="flex flex-row flex-grow w-full items-center">
        <button
          type="button"
          class="flex flex-shrink lg:text-2xl text-blue-500 pr-5 mr-5 items-center border-r-2"
          on:click={() => history.back()}
        >
          Back
        </button>

        <h1 class="flex flex-grow lg:text-4xl font-bold">
          Order #{orderReport.id}
        </h1>
      </div>

      <div
        class="flex flex-row justify-end items-center w-full space-x-4 bg-white lg:px-5 lg:py-3"
        on:click={(e) => e.stopPropagation()}
      >
        <h1 class="flex font-bold lg:text-4xl text-blue-500">
          {orderReport.status}
        </h1>
        <div><OrderPayButton orderData={orderReport} /></div>
      </div>
    </div>

    <div class="flex flex-col mt-10 w-full lg:flex-row lg:space-x-16">
      <div class="flex lg:basis-6/12 flex-col w-full">
        <h1 class="flex font-bold text-lg my-3">Summary</h1>

        <div class="flex flex-row w-full justify-between">
          <h1 class="flex text-lg">Create date:</h1>
          <h1 class="flex text-lg">
            {new Date(orderReport.createdAt).toLocaleString()}
          </h1>
        </div>

        <div class="flex flex-row w-full justify-between">
          <h1 class="flex text-lg">Status:</h1>
          <h1 class="flex text-lg">{orderReport.status}</h1>
        </div>

        <div class="flex flex-row w-full justify-between">
          <h1 class="flex text-lg">Total:</h1>
          <h1 class="flex text-lg">{orderReport.total}</h1>
        </div>
      </div>

      <div class="flex mt-5 lg:mt-0 lg:basis-6/12 flex-col w-full">
        <h1 class="flex font-bold text-lg my-3">Shipping Address</h1>
        <h1 class="flex whitespace-pre-wrap">{orderReport.shippingAddress}</h1>
      </div>
    </div>

    <div class="flex flex-col w-full mt-20">
      <h1 class="flex font-bold text-lg">Order Items</h1>
    </div>

    <div
      class="flex flex-row border-2 w-full px-5 py-3 mt-3 justify-center bg-gray-100"
    >
      <div class="basis-3/12 flex-grow flex justify-center">
        <h1 class="font-bold">Product</h1>
      </div>

      <div class="basis-3/12 flex-grow flex justify-center">
        <h1 class="font-bold">Price</h1>
      </div>

      <div class="basis-3/12 flex-grow flex justify-center">
        <h1 class="font-bold">Amount</h1>
      </div>

      <div class="basis-3/12 flex-grow flex justify-center">
        <h1 class="font-bold">Total</h1>
      </div>
    </div>

    {#each orderReport.orderItems as item}
      <OrderReportRow orderItemData={item} />
    {/each}

    <div class="flex flex-row justify-end w-full mt-10">
      <h1 class="flex text-2xl font-bold">Total: {orderReport.total}</h1>
    </div>

    <div class="flex flex-col w-full mt-10">
      <h1 class="flex font-bold text-lg my-2">Payments:</h1>
      <OrderReportPayment data={orderReport.payments} />
    </div>
  {:else}
    <div class="my-96" />
  {/if}
</div>

<Footer />
