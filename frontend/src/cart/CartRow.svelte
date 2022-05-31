<script lang="ts">
  let removed = false;

  function remove() {
    removed = true;
  }
</script>

{#if removed === false}
  <div class="flex py-5 border-t-2 bg-gray-50">
    <div class="flex basis-2/6 flex-grow justify-center">
      <div class="flex justify-center items-center">
        <div class="flex">
          <img src="img/teddy.jpg" alt="" class="w-20 h-w-20" />
        </div>
        <div class="flex">
          <h1 class="pl-6">Lovely Teddy Bear</h1>
        </div>
      </div>
    </div>

    <div class="flex basis-1/6 flex-grow justify-center items-center">
      <h1>$5.99</h1>
    </div>

    <div class="flex basis-1/6 flex-grow justify-center items-center">
      <h1>1</h1>
    </div>

    <div class="flex basis-1/6 flex-grow justify-center items-center">
      <h1>$5.99</h1>
    </div>

    <div class="flex basis-1/6 flex-grow justify-center items-center">
      <button type="button" class="underline" on:click={remove}>Remove</button>
    </div>
  </div>
{/if}
