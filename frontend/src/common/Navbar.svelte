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

  export function toggleOverlay() {
    if (showSidebar) {
      hideOverlay();
    } else {
      showOverlay();
    }
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
              <h1 class="font-bold text-white text-sm sm:text-2xl">
                IRASSHAIMASE
              </h1>
            </div>
            <div>
              <h1 class="font-bold text-white text-sm sm:text-sm">
                いらっしゃいませ
              </h1>
            </div>
          </div>
        </Link>
      </div>

      <div
        class="
          fixed z-50 flex flex-col w-full h-screen bg-blue-400 inset-0 space-y-5 p-5 mt-20

          ease-in-out duration-300
          {showSidebar ? 'translate-x-0' : '-translate-x-full'}

          sm:relative sm:flex sm:flex-row sm:w-fit sm:h-fit sm:bg-blue-500 sm:space-y-0 sm:p-0 sm:mt-0
          sm:gap-x-12 sm:content-center sm:items-baseline sm:translate-x-0
        "
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

        <hr class="visible sm:hidden bg-white" />

        <div class="flex">
          <CartButton />
        </div>
      </div>

      <div class="flex sm:hidden">
        <button
          type="button"
          class="font-bold text-white text-lg"
          on:click={toggleOverlay}
        >
          Menu
        </button>
      </div>
    </div>
  </div>
</div>
