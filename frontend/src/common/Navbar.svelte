<script lang="ts">
  import { onDestroy } from "svelte";
  import { Link } from "svelte-routing";
  import CartButton from "../cart/CartButton.svelte";
  import { userStore } from "../user/user.store";

  export let showSidebar = false;

  export function showOverlay() {
    showSidebar = true;
    document.body.style.overflow = "hidden";
  }

  export function hideOverlay() {
    showSidebar = false;
    document.body.style.overflow = "auto";
  }

  onDestroy(() => {
    hideOverlay();
  });
</script>

<div class="w-full bg-blue-500 px-5 md:px-16">
  <div class="py-5">
    <div class="flex flex-row justify-between">
      <div class="flex">
        <Link to="/">
          <div class="flex flex-col">
            <div>
              <h1 class="font-bold text-white text-2xl">IRASSHAIMASE</h1>
            </div>
            <div>
              <h1 class="font-bold text-white text-sm">いらっしゃいませ</h1>
            </div>
          </div>
        </Link>
      </div>

      <div
        class="hidden sm:flex flex-row gap-x-12 pt-2 content-center items-baseline"
      >
        <!-- <Link to="/contact" class="font-bold text-white">CONTACT</Link>
        <Link to="/about" class="font-bold text-white">ABOUT</Link> -->
        {#if $userStore}
          <div class="flex">
            <!-- TODO: Need implementation -->
            <!-- <Link to="/profile" class="font-bold text-white">Profile</Link> -->
          </div>

          {#if $userStore.role === "ADMIN"}
            <div class="flex">
              <Link to="/admin/product" class="font-bold text-white">
                Admin
              </Link>
            </div>
          {/if}

          <div class="flex">
            <Link to="/payment" class="font-bold text-white">Payment</Link>
          </div>

          <div class="flex">
            <Link to="/order" class="font-bold text-white">Order</Link>
          </div>

          <div class="flex">
            <Link to="/account" class="font-bold text-white">Account</Link>
          </div>
        {:else}
          <div class="flex">
            <Link to="/login" class="font-bold text-white">LOGIN</Link>
          </div>
        {/if}

        <div class="flex">
          <CartButton />
        </div>
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

<!-- MOBILE SIDEBAR -->
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
          <Link to="/">
            <h1 class="font-bold text-white text-2xl">IRASSHAIMASE</h1>
            <h1 class="font-bold text-white text-sm">いらっしゃいませ</h1>
          </Link>
        </div>
      </div>

      <!-- 
      <div class="flex py-5">
        <Link to="/contact" class="font-bold">CONTACT</Link>
      </div>

      <div class="flex py-5">
        <Link to="/about" class="font-bold">ABOUT</Link>
      </div> -->

      <div class="flex py-5">
        <CartButton />
      </div>
    </div>
  </div>
{/if}
