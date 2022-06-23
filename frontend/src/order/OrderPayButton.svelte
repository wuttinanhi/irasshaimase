<script lang="ts">
  import { PaymentAPI } from "../api/payment.api";

  interface IOrderPay {
    id: any;
    status: string;
  }

  export let orderData: IOrderPay;
  const paymentApi = new PaymentAPI();
  let payDisabled = false;

  async function pay() {
    try {
      payDisabled = true;
      const result = await paymentApi.pay(orderData.id);
      window.location.href = result.payUrl;
    } catch (error) {
      alert("Payment failed");
    } finally {
      setTimeout(() => {
        payDisabled = false;
      }, 3000);
    }
  }
</script>

{#if orderData.status === "PENDING"}
  <button
    type="button"
    class="flex py-2 px-10  {payDisabled
      ? 'bg-blue-400'
      : 'bg-blue-600'}  text-white font-bold text-lg"
    disabled={payDisabled}
    on:click={pay}
  >
    Pay
  </button>
{/if}
