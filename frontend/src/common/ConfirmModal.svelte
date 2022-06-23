<script lang="ts">
  export let showing = false;
  export let title = "";
  export let message = "";
  export let result = false;
  export let callback: (result: boolean) => void = null;

  export function showOverlay() {
    showing = true;
    document.body.style.overflow = "hidden";
  }

  export function hideOverlay() {
    showing = false;
    document.body.style.overflow = "auto";
  }

  async function onConfirm() {
    result = true;
    if (callback) callback(result);
    hideOverlay();
  }

  async function onCancel() {
    result = false;
    if (callback) callback(result);
    hideOverlay();
  }
</script>

{#if showing === true}
  <div
    tabindex="-1"
    aria-hidden="true"
    class="z-50 flex fixed w-full h-screen bg-black bg-opacity-60 inset-0"
  >
    <div class="mx-auto my-auto px-0">
      <div
        class="flex flex-col bg-white p-5 space-y-2 my-auto h-fit"
        on:click={(e) => e.stopPropagation()}
      >
        <div class="flex my-3 justify-between">
          <h1 class="flex text-lg font-bold">{title}</h1>

          <div class="flex shrink h-fit ml-5">
            <button on:click={onCancel} class="text-lg text-gray-400 font-bold">
              🗙
            </button>
          </div>
        </div>

        <div class="flex w-full">
          <p class="whitespace-pre-wrap">{message}</p>
        </div>

        <div class="flex w-full justify-end mt-5 space-x-2">
          <button
            type="button"
            class="flex bg-blue-600 px-4 py-2 text-white font-bold"
            on:click={onConfirm}
          >
            Confirm
          </button>
          <button
            type="button"
            class="flex border-2 border-blue-600 px-4 py-2 text-blue-600 font-bold"
            on:click={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
