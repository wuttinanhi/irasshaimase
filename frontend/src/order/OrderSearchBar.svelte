<script lang="ts">
  export let searchValue: string = null;
  export let onSearch: (value: string) => void = null;

  function onSubmit(e: Event) {
    e.preventDefault();
    if (onSearch) onSearch(searchValue);
  }
</script>

<form on:submit={onSubmit} class="flex flex-row w-full space-x-2">
  <input
    type="text"
    placeholder="Search order"
    class="flex flex-grow p-3 border-2 w-full"
    bind:value={searchValue}
  />

  <button
    type="submit"
    class="flex flex-shrink py-3 px-6 bg-blue-600 text-white"
  >
    Search
  </button>
</form>
