<script lang="ts">
  import CartButton from "../cart/CartButton.svelte";

  export let showSidebar = false;

  export function showOverlay() {
    showSidebar = true;
    document.body.style.overflow = "hidden";
  }

  export function hideOverlay() {
    showSidebar = false;
    document.body.style.overflow = "auto";
  }
</script>

<div class="w-full bg-blue-500 px-5 md:px-16">
  <div class="py-5">
    <div class="flex flex-row">
      <div class="flex grow">
        <a href="/">
          <div class="flex flex-col">
            <div>
              <h1 class="font-bold text-white text-2xl">IRASSHAIMASE</h1>
            </div>
            <div>
              <h1 class="font-bold text-white text-sm">いらっしゃいませ</h1>
            </div>
          </div>
        </a>
      </div>

      <div
        class="hidden sm:flex flex-row gap-x-12 pt-2 content-center items-baseline"
      >
        <a href="/contact" class="font-bold text-white">CONTACT</a>
        <a href="/about" class="font-bold text-white">ABOUT</a>
        <CartButton />
      </div>

      <div class="flex sm:hidden">
        <button
          type="button"
          class="font-bold text-white text-lg"
          on:click={showOverlay}
        >
          Menu
        </button>
      </div>
    </div>
  </div>
</div>

{#if showSidebar}
  <div
    class="z-100 flex fixed inset-0 w-full h-full bg-black bg-opacity-80"
    on:click={hideOverlay}
  >
    <div
      class="z-101 flex flex-col px-5 basis-9/12 bg-blue-600 text-white"
      on:click={(e) => e.stopPropagation()}
    >
      <div class="flex pt-10 pb-8 w-full">
        <div class="flex flex-col w-full pb-5 border-b-2">
          <a href="/">
            <h1 class="font-bold text-white text-2xl">IRASSHAIMASE</h1>
            <h1 class="font-bold text-white text-sm">いらっしゃいませ</h1>
          </a>
        </div>
      </div>

      <div class="flex py-5">
        <a href="/contact" class="font-bold">CONTACT</a>
      </div>

      <div class="flex py-5">
        <a href="/about" class="font-bold">ABOUT</a>
      </div>

      <div class="flex py-5">
        <CartButton />
      </div>
    </div>
  </div>
{/if}
