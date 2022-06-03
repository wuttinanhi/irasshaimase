<script lang="ts">
  import type { IProduct } from "./IProduct";
  import ProductCard from "./ProductCard.svelte";

  const mockProducts: IProduct[] = [
    {
      id: 1,
      name: "Teddy Bear",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "/img/teddy.jpg",
      price: 5,
    },
    {
      id: 2,
      name: "Bear Doll",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "/img/teddy.jpg",
      price: 10,
    },
    {
      id: 3,
      name: "Lovely Bear",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "/img/teddy.jpg",
      price: 15,
    },
  ];
</script>

<div class="flex w-full flex-wrap">
  {#each mockProducts as product}
    <ProductCard productData={product} />
  {/each}
</div>
