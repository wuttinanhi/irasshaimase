<script lang="ts">
  import { onMount } from "svelte";

  interface IPagination {
    currentPage: number;
    totalPages: number;
  }

  export let onChange: (page: number) => void = null;
  export let pagination: IPagination = { currentPage: 1, totalPages: 1 };

  let pageNumber: number[] = [];

  function generatePageNumber() {
    pageNumber = [];
    const start = 1;
    const end = pagination.totalPages;
    for (let i = start; i < end; i++) pageNumber.push(i);
    return pageNumber;
  }

  function change(page: number) {
    if (onChange) onChange(page);
  }

  onMount(() => generatePageNumber());
</script>

<div class="flex flex-row md:justify-end items-center flex-wrap">
  {#each pageNumber as i}
    <button
      type="button"
      class={pagination.currentPage === i ? "selected" : "normal"}
      disabled={pagination.currentPage === i}
      on:click={() => change(i)}
    >
      {i}
    </button>
  {/each}
</div>

<style lang="postcss">
  .normal {
    @apply flex bg-white border-2 border-blue-600;
    @apply text-blue-600 font-bold text-lg text-center px-3 py-1 m-1;
  }

  .selected {
    @apply flex bg-blue-600 border-2 border-blue-600;
    @apply text-white font-bold text-lg text-center px-3 py-1 m-1;
  }
</style>
