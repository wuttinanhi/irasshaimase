<script lang="ts">
  import { Link } from "svelte-routing";
  import { Cart } from "./cart";

  let totalPrice = Cart.getTotal();

  Cart.getCartStore().subscribe(() => {
    totalPrice = Cart.getTotal();
  });
</script>

<Link
  to="/cart"
  class="py-3 px-5 text-center font-bold rounded-md bg-white text-blue-600 w-full"
>
  Cart (${totalPrice})
</Link>
