<script>
  import { Route, Router } from "svelte-routing";
  import CartPage from "./cart/CartPage.svelte";
  import Index from "./Index.svelte";
  import NotFoundPage from "./page/NotFoundPage.svelte";
  import Product from "./Product.svelte";
  import ProductOverlay from "./product/ProductOverlay.svelte";

  export let url = "";
</script>

<Router {url}>
  <Route path="/product/:id" let:params>
    <Product productId={params.id} />
  </Route>
  <Route path="/cart"><CartPage /></Route>
  <Route path="/"><Index /></Route>
  <Route path="/dev/ProductOverlay"><ProductOverlay showing={true} /></Route>
  <Route path="/*"><NotFoundPage /></Route>
</Router>
