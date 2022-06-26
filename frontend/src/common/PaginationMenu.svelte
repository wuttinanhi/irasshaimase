<script lang="ts">
  interface IPagination {
    currentPage: number;
    totalPages: number;
  }

  export let onChange: (page: number) => void = null;
  export let pagination: IPagination = null;

  function generatePageNumber() {
    const result: number[] = [];
    const start = pagination.currentPage + 1;
    const end = pagination.totalPages;
    for (let i = start; i < end; i++) result.push(i);
    return result;
  }

  function change(page: number) {
    if (onChange) onChange(page);
  }
</script>

<div class="flex flex-row justify-end items-center">
  <button type="button" on:click={() => change(1)}> 1 </button>

  {#each generatePageNumber() as i}
    <button type="button" on:click={() => change(i)}>
      {i}
    </button>
  {/each}

  {#if pagination.totalPages - 1 > 0}
    <button type="button" on:click={() => change(pagination.totalPages)}>
      {pagination.totalPages}
    </button>
  {/if}
</div>

<style lang="postcss">
  button {
    @apply flex bg-white border-2 border-blue-600;
    @apply text-blue-600 font-bold text-lg text-center px-3 py-1 m-1;
  }
</style>
