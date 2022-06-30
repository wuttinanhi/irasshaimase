<script>
  import { Route, Router } from "svelte-routing";
  import CartPage from "./cart/CartPage.svelte";
  import InputNumber from "./common/InputNumber.svelte";
  import Index from "./Index.svelte";
  import OrderPage from "./order/OrderPage.svelte";
  import OrderReportPage from "./order/OrderReportPage.svelte";
  import NotFoundPage from "./page/NotFoundPage.svelte";
  import PaymentPage from "./payment/PaymentPage.svelte";
  import PaymentSuccessHandler from "./payment/PaymentSuccessHandler.svelte";
  import ProductOverlay from "./product/ProductOverlay.svelte";
  import ProductPage from "./product/ProductPage.svelte";
  import LoginPage from "./user/LoginPage.svelte";
  import LogoutPage from "./user/LogoutPage.svelte";
  import UserPage from "./user/UserPage.svelte";

  export let url = "";
</script>

<Router {url}>
  <Route path="/product/:id" let:params>
    <ProductPage productId={params.id} />
  </Route>
  <Route path="/login"><LoginPage /></Route>
  <Route path="/logout"><LogoutPage /></Route>

  <Route path="/order"><OrderPage /></Route>
  <Route path="/order/:id" let:params>
    <OrderReportPage orderId={params.id} />
  </Route>
  <Route path="/cart"><CartPage /></Route>
  <Route path="/payment"><PaymentPage /></Route>
  <Route path="/account"><UserPage /></Route>

  <Route path="/paypal/success"><PaymentSuccessHandler /></Route>
  <Route path="/paypal/cancel"><PaymentSuccessHandler /></Route>

  <Route path="/dev/ProductOverlay"><ProductOverlay showing={true} /></Route>
  <Route path="/dev/InputNumber"><InputNumber /></Route>

  <Route path="/"><Index /></Route>
  <Route path="/*"><NotFoundPage /></Route>
</Router>
