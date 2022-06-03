<script lang="ts">
  import { Cart } from "./cart";

  let totalPrice = Cart.getToal();

  Cart.getCartStore().subscribe(() => {
    totalPrice = Cart.getToal();
  });
</script>

<a
  href="/cart"
  class="py-3 px-5 text-center font-bold rounded-md bg-white text-blue-600 w-full"
>
  Cart (${totalPrice})
</a>
