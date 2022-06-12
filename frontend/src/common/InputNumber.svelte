<script lang="ts">
  export let value: number = 0;
  export let min: number = 0;
  export let max: number = 9999;
  export let onChange: (value: number) => void = () => {};
  export let disabled: boolean = false;

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

  function onInputChange(e) {
    value = parseInt(e.target.value) ?? 0;
    // clamp value
    if (value < min) value = min;
    if (value > max) value = max;
    // call callback
    onChange(value);
  }
</script>

<div class="flex flex-row flex-shrink space-x-2">
  {#if disabled === false}
    <div class="flex flex-shrink">
      <button class="input-number-button align-top" on:click={decrease}>
        -
      </button>
    </div>
  {/if}

  <div class="flex px-1 flex-shrink">
    <input
      type="number"
      inputmode="numeric"
      {value}
      class="no-spin rounded-md border-2 text-xl text-center w-full"
      on:change={onInputChange}
      {disabled}
    />
  </div>

  {#if disabled === false}
    <div class="flex flex-shrink">
      <button class="input-number-button" on:click={increase}> + </button>
    </div>
  {/if}
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
    @apply flex flex-shrink h-10 w-10 rounded-full bg-white font-bold text-blue-400 border-2 text-2xl justify-center text-center align-middle;
  }
</style>
