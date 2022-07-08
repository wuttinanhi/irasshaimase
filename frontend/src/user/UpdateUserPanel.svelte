<script lang="ts">
  import { onMount } from "svelte";
  import type { IAPIError } from "../api/base.api";
  import { UserAPI } from "../api/user.api";

  const userApi = new UserAPI();

  let name = "";
  let disabled = false;
  let errorMessage = null;
  let result = null;

  async function updateUser() {
    try {
      errorMessage = null;
      result = null;
      disabled = true;
      await userApi.updateUser({ name });
      result = "Updated";
    } catch (error) {
      const err = error as IAPIError;
      errorMessage = err.message;
    } finally {
      disabled = false;
    }
  }

  async function load() {
    const user = await userApi.getUser();
    name = user.name;
  }

  onMount(() => {
    load();
  });
</script>

<div class="flex flex-col w-full">
  <div class="flex flex-col">
    <h1 class="font-bold text-xl">Update User</h1>
  </div>

  <div class="flex flex-col mt-10 space-y-3">
    <input
      type="text"
      name="name"
      placeholder="Name"
      class="p-2 border-2"
      {disabled}
      bind:value={name}
    />
  </div>

  <div class="flex flex-col">
    {#if errorMessage}
      <div class="text-red-500">{errorMessage}</div>
    {/if}
    {#if result}
      <div class="text-green-500">{result}</div>
    {/if}
  </div>

  <div class="flex w-full mt-5">
    <button
      type="button"
      class="flex bg-blue-600 px-6 py-3 text-white font-bold"
      {disabled}
      on:click={updateUser}
    >
      Update
    </button>
  </div>
</div>
