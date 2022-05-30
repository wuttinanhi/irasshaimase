<script>
  import { Route, Router } from "svelte-routing";
  import Index from "./Index.svelte";
  import Product from "./Product.svelte";
  import Store from "./Store.svelte";

  export let url = "";
</script>

<Router {url}>
  <!-- <nav>
    <Link to="/">Home</Link>
    <Link to="about">About</Link>
    <Link to="blog">Blog</Link>
  </nav> -->
  <div>
    <Route path="store" component={Store} />
    <Route path="/product/:id" let:params>
      <Product productId={params.id} />
    </Route>
    <Route path="/"><Index /></Route>
  </div>
</Router>
