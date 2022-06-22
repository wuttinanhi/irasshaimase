<script lang="ts">
  import { PaymentAPI } from "../api/payment.api";
  import { Cart } from "../cart/cart";
  import { getQueryParam } from "../etc/helper";

  // get token query param
  let token = getQueryParam("token");

  async function process() {
    if (window.location.href.includes("cancel") || !token) {
      window.location.href = "/cart?success=false";
    } else {
      const api = new PaymentAPI();
      const result = await api.success(token);
      Cart.emptyCart();
      window.location.href = `/order/${result.orderId}`;
    }
  }

  process();
</script>
