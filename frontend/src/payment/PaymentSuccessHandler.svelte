<script lang="ts">
  import { PaymentAPI } from "../api/payment";
  import { getQueryParam } from "../etc/helper";

  // get token query param
  let token = getQueryParam("token");

  async function process() {
    if (!token) window.location.href = "/cart?success=false";
    const api = new PaymentAPI();
    const result = await api.success(token);
    window.location.href = `/order/${result.orderId}`;
  }

  process();
</script>
