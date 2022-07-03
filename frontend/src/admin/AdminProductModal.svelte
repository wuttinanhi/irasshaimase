<script lang="ts">
  import { ProductImageAPI } from "../api/product-image.api";

  import { IProductDto, ProductAPI } from "../api/product.api";
  import { PLACEHOLDER_IMAGE } from "../etc/mock";
  import type { IProduct } from "../product/IProduct";

  const productApi = new ProductAPI();
  const productImageApi = new ProductImageAPI();

  export let showing = false;
  export let id: number = null;
  export let mode: "ADD" | "UPDATE" = "ADD";
  export let callback: (result: IProduct) => void = null;

  export let data: IProduct = null;
  let name: string = data?.name;
  let description: string = data?.description;
  let price: number = data?.price;
  let stock: number = data?.stock;

  let productImageInput: any;
  let productImage: File;
  let productImageUrl: any;

  function onFileSelected(e) {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => (productImageUrl = e.target.result);
    productImage = image;
  }

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
        const newProduct = await productApi.create(dto);
        await productImageApi.addProductImage(newProduct.id, productImage);
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

        <div class="flex flex-col w-full justify-center items-center">
          {#if mode === "UPDATE"}
            <img
              src={data.image}
              alt={"Product Image"}
              class="flex w-32 h-3w-32 object-fill"
            />
          {:else}
            <img
              src={productImageUrl || PLACEHOLDER_IMAGE}
              alt={"Product Image"}
              class="flex w-32 h-3w-32 object-fill"
            />
          {/if}

          <input
            style="display:none"
            type="file"
            accept=".jpg, .jpeg, .png"
            bind:this={productImageInput}
            on:change={(e) => onFileSelected(e)}
          />

          <button
            type="button"
            class="flex shrink my-2 bg-blue-600 px-5 py-3 text-white font-bold"
            on:click={() => productImageInput.click()}
          >
            Upload
          </button>
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
            placeholder="Stock"
            class="w-full p-2 border-2"
            bind:value={stock}
          />
        </div>

        <div class="flex space-x-2 w-full">
          <textarea
            placeholder="Product Description"
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
