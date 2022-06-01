<script lang="ts">
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
    class="z-50 flex fixed w-full h-screen bg-black bg-opacity-80 inset-0"
    on:click={() => hideOverlay()}
  >
    <div class="mx-auto my-auto px-96">
      <div
        class="flex bg-white flex-row max-h-[80vh]"
        on:click={(e) => e.stopPropagation()}
      >
        <!-- PRODUCT IMAGE -->

        <div class="flex flex-grow basis-3/5">
          <img src="img/teddy.jpg" alt="" class="object-fill w-full h-full" />
        </div>

        <!-- PRODUCT PANEL -->

        <div class="flex flex-col w-full basis-2/5">
          <!-- PRODUCT HEADER -->

          <div class="flex flex-row p-5 justify-between">
            <div class="flex grow flex-col">
              <h1 class="font-bold text-4xl">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </h1>

              <h1 class="font-bold text-2xl mt-5 text-lime-500">$5.99</h1>
            </div>

            <div class="flex shrink h-fit">
              <button
                on:click={hideOverlay}
                class="text-lg text-gray-400 font-bold p-3">X</button
              >
            </div>
          </div>

          <!-- PRODUCT DESCRIPTION -->

          <div class="flex max-h-full overflow-y-hidden">
            <div class="flex overflow-y-scroll">
              <p class="text-lg px-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
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
{/if}
