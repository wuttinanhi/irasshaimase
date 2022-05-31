<script lang="ts">
  import CartHeader from "./CartHeader.svelte";
  import CartRow from "./CartRow.svelte";
</script>

<div class="flex flex-col w-full border-b-2">
  <CartHeader />

  {#each { length: 3 } as _, i}
    <CartRow />
  {/each}
</div>
