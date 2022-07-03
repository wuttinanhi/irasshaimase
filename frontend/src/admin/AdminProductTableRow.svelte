<script lang="ts">
  import { ProductAPI } from "../api/product.api";
  import ConfirmModal from "../common/ConfirmModal.svelte";
  import type { IProduct } from "../product/IProduct";
  import AdminProductModal from "./AdminProductModal.svelte";

  export let data: IProduct = null;
  export let callback: (result: IProduct) => void = null;

  const productApi = new ProductAPI();

  let editModal: AdminProductModal;
  let deleteDialog: ConfirmModal;

  function onEditClick() {
    editModal.show();
  }

  function onEditCallback() {
    if (callback) callback(data);
  }

  function onDeleteClick() {
    deleteDialog.showOverlay();
  }

  async function onDeleteCallback(result: boolean) {
    if (result === true) {
      await productApi.delete(data.id);
      if (callback) callback(data);
    }
  }
</script>

{#if data}
  <ConfirmModal
    bind:this={deleteDialog}
    title={"Confirm Product Delete"}
    message={"Are you sure want to delete this product?"}
    callback={onDeleteCallback}
  />

  <AdminProductModal
    bind:this={editModal}
    {data}
    mode="UPDATE"
    callback={onEditCallback}
  />

  <div
    class="flex flex-row border-b-2 border-x-2 w-full px-5 py-3 justify-center bg-gray-50"
  >
    <div class="flex basis-1/5 flex-grow justify-center items-center">
      <h1 class="font-bold"><h1>{data.id}</h1></h1>
    </div>

    <div class="flex basis-1/5 flex-grow justify-center items-center">
      <img src={data.image} alt={data.name} class="w-20 h-20 object-fill" />
    </div>

    <div class="flex basis-1/5 flex-grow justify-center items-center">
      <h1 class="font-bold">{data.name}</h1>
    </div>

    <div class="flex basis-1/5 flex-grow justify-center items-center">
      <h1 class="font-bold">{data.stock}</h1>
    </div>

    <div class="flex basis-1/5 flex-grow justify-center flex-row items-center">
      <button
        type="button"
        class="m-1 px-5 py-1 h-fit bg-yellow-500 text-white font-bold"
        on:click={onEditClick}
      >
        Edit
      </button>

      <button
        type="button"
        class="m-1 px-5 py-1 h-fit bg-red-500 text-white font-bold"
        on:click={onDeleteClick}
      >
        Delete
      </button>
    </div>
  </div>
{/if}
