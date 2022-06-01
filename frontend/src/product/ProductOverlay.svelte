<script lang="ts">
  import { LOREM } from "../etc/lorem";
  import type { IProduct } from "./IProduct";

  export let productData: IProduct = {
    id: 1,
    name: "Teddy Bear",
    description: LOREM,
    price: 5.99,
    imageUrl: "/img/teddy.jpg",
  };

  export let showing = false;

  export function showOverlay() {
    showing = true;
    document.body.style.overflow = "hidden";
  }

  export function hideOverlay() {
    showing = false;
    document.body.style.overflow = "auto";
  }
</script>

{#if showing === true}
  <div
    tabindex="-1"
    aria-hidden="true"
    class="z-50 flex fixed w-full h-screen bg-black bg-opacity-80 inset-0 invisible md:visible"
    on:click={() => hideOverlay()}
  >
    <div class="mx-auto my-auto px-96">
      <div
        class="flex bg-white flex-row max-h-[80vh]"
        on:click={(e) => e.stopPropagation()}
      >
        <!-- PRODUCT IMAGE -->

        <div class="flex flex-grow basis-3/5">
          <img
            src={productData.imageUrl}
            alt=""
            class="object-fill w-full h-full"
          />
        </div>

        <!-- PRODUCT PANEL -->

        <div class="flex flex-col w-full basis-2/5">
          <!-- PRODUCT HEADER -->

          <div class="flex flex-row p-5 justify-between">
            <div class="flex grow flex-col">
              <h1 class="font-bold text-4xl">
                {productData.name}
              </h1>

              <h1 class="font-bold text-2xl mt-5 text-lime-500">
                ${productData.price}
              </h1>
            </div>

            <div class="flex shrink h-fit">
              <button
                on:click={hideOverlay}
                class="text-lg text-gray-400 font-bold p-3">X</button
              >
            </div>
          </div>

          <!-- PRODUCT DESCRIPTION -->

          <div class="flex flex-grow max-h-full overflow-y-hidden">
            <div class="flex overflow-y-auto">
              <p class="text-lg px-5">
                {productData.description}
              </p>
            </div>
          </div>

          <!-- ADD TO CART BUTTON -->

          <div class="flex flex-row p-5">
            <button
              class="w-full bg-blue-400 h-full py-3 rounded-sm text-white font-bold text-xl"
              on:click={hideOverlay}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- MOBILE VERSION -->

  <div
    tabindex="-1"
    aria-hidden="true"
    class="z-50 flex fixed w-full h-screen bg-black bg-opacity-80 inset-0 visible md:invisible"
  >
    <div class="flex max-h-full overflow-y-hidden">
      <div class="flex flex-col bg-white overflow-y-scroll">
        <div class="flex">
          <div class="flex px-2">
            <button on:click={hideOverlay} class="text-2xl text-gray-400 p-3">
              Back
            </button>
          </div>
        </div>

        <!-- PRODUCT IMAGE -->

        <div class="flex">
          <img
            src={productData.imageUrl}
            alt=""
            class="object-fill w-full h-full"
          />
        </div>

        <!-- START PRODUCT PANEL -->

        <div class="flex flex-col w-full h-full mb-56">
          <!-- PRODUCT HEADER -->
          <div class="flex flex-row pt-5 px-5 justify-between">
            <div class="flex flex-col w-full">
              <h1 class="font-bold text-2xl">
                {productData.name}
              </h1>

              <h1 class="font-bold text-2xl mt-5 text-lime-500">
                ${productData.price}
              </h1>
            </div>
          </div>

          <!-- ADD TO CART BUTTON -->
          <div class="flex flex-row p-5">
            <button
              class="w-full bg-blue-400 h-full py-3 rounded-sm text-white font-bold text-xl"
              on:click={hideOverlay}
            >
              Add to cart
            </button>
          </div>

          <!-- PRODUCT DESCRIPTION -->
          <div class="flex flex-col w-full h-full">
            <p class="text-lg px-5 pb-10">
              {productData.description}
            </p>
          </div>
        </div>

        <!-- END PRODUCT PANEL -->
      </div>
    </div>
  </div>
{/if}
