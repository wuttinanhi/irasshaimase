<script lang="ts">
  export let value: number = 0;
  export let min: number = 0;
  export let max: number = 9999;

  export let onBeforeChange: (value: number) => boolean = null;
  export let onChange: (value: number) => void = null;

  export let disabled: boolean = false;
  let internalValue: number = value;

  function increase() {
    if (onBeforeChange) {
      const shouldChange = onBeforeChange(value + 1);
      if (shouldChange === false) return;
    }

    value += 1;
    if (max && value >= max) value = max;

    internalValue = value;
    if (onChange) onChange(value);
  }

  function decrease() {
    if (onBeforeChange) {
      const shouldChange = onBeforeChange(value - 1);
      if (shouldChange === false) return;
    }

    value -= 1;
    if (min && value <= min) value = min;

    internalValue = value;
    if (onChange) onChange(value);
  }

  function onInputChange(e) {
    const inputValue = parseInt(e.target.value) ?? 0;

    if (onBeforeChange) {
      const shouldChange = onBeforeChange(inputValue);
      if (shouldChange === false) {
        internalValue = null;
        internalValue = value;
        return;
      }
    }

    value = inputValue;

    // clamp value
    if (min && value < min) value = min;
    if (max && value > max) value = max;

    internalValue = value;
    if (onChange) onChange(value);
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
      value={internalValue}
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
