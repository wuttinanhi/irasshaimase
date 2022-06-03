<script lang="ts">
  export let value: number = 0;
  export let min: number = 0;
  export let max: number = 9999;
  export let onChange: (value: number) => void = () => {};

  function increase() {
    value += 1;
    if (value >= max) value = max;
    onChange(value);
  }

  function decrease() {
    value -= 1;
    if (value <= min) value = min;
    onChange(value);
  }
</script>

<div class="flex flex-row flex-shrink space-x-2">
  <div class="flex">
    <button class="input-number-button align-top" on:click={decrease}>-</button>
  </div>

  <div class="flex">
    <input
      type="number"
      inputmode="numeric"
      {value}
      class="no-spin rounded-md border-0 text-xl text-center max-w-[50px] max-h-[80px]"
    />
  </div>

  <div class="flex">
    <button class="input-number-button" on:click={increase}> + </button>
  </div>
</div>

<style lang="postcss">
  .no-spin::-webkit-inner-spin-button,
  .no-spin::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
  }

  .no-spin {
    -moz-appearance: textfield !important;
  }

  .input-number-button {
    @apply flex flex-shrink h-10 w-10 rounded-full shadow-md bg-white font-bold text-blue-400 text-2xl justify-center text-center align-middle;
  }
</style>
