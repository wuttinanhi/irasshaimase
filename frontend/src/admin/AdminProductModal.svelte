<script lang="ts">
  import { IProductDto, ProductAPI } from "../api/product.api";
  import type { IProduct } from "../product/IProduct";

  const productApi = new ProductAPI();

  export let showing = false;
  export let id: number = null;
  export let mode: "ADD" | "UPDATE" = "ADD";
  export let callback: (result: IProduct) => void = null;

  export let data: IProduct = null;
  let name: string = data?.name;
  let description: string = data?.description;
  let price: number = data?.price;
  let stock: number = data?.stock;

  export function show() {
    showing = true;
    document.body.style.overflow = "hidden";
  }

  export function hide() {
    showing = false;
    document.body.style.overflow = "auto";
  }

  // hide overlay when esc key pressed
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hide();
  });

  // on submit button click
  async function onButtonClick() {
    try {
      const dto: IProductDto = { name, description, price, stock };

      if (mode === "ADD") {
        await productApi.create(dto);
      } else if (mode === "UPDATE") {
        await productApi.update(data.id, dto);
      }

      if (data) data.id = id;
      if (callback) callback(data);

      hide();
    } catch (error) {
      alert(error.message);
    }
  }
</script>

{#if showing === true}
  <div
    tabindex="-1"
    aria-hidden="true"
    class="z-50 flex fixed w-full h-screen bg-black bg-opacity-60 inset-0"
  >
    <div class="md:mx-auto md:my-auto px-0">
      <div
        class="flex flex-col bg-white p-5 space-y-2 h-full md:h-fit"
        on:click={(e) => e.stopPropagation()}
      >
        <div class="flex my-3 justify-between">
          <h1 class="flex text-lg font-bold">
            {mode === "ADD" ? "New Product" : "Update Product"}
          </h1>

          <div class="flex shrink h-fit">
            <button on:click={hide} class="text-lg text-gray-400 font-bold">
              🗙
            </button>
          </div>
        </div>

        <div class="flex space-x-2 w-full">
          <input
            type="text"
            placeholder="Product Name"
            class="w-full p-2 border-2"
            bind:value={name}
          />
        </div>

        <div class="flex space-x-2 w-full">
          <input
            type="number"
            placeholder="Price"
            class="w-full p-2 border-2"
            bind:value={price}
          />
          <input
            type="number"
            placeholder="Lastname"
            class="w-full p-2 border-2"
            bind:value={stock}
          />
        </div>

        <div class="flex space-x-2 w-full">
          <textarea
            placeholder="More information"
            rows="5"
            class="w-full p-2 border-2"
            bind:value={description}
          />
        </div>

        <div class="flex w-full justify-center mt-5">
          <button
            type="button"
            class="flex bg-blue-600 px-6 py-3 text-white font-bold"
            on:click={onButtonClick}
          >
            {mode === "ADD" ? "Add" : "Update"}
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
