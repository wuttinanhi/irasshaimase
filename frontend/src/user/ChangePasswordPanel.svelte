<script lang="ts">
  import { AuthAPI } from "../api/auth.api";

  const api = new AuthAPI();

  let currentPassword = "";
  let newPassword = "";
  let confirmPassword = "";

  let disabled = false;

  async function changePassword() {
    try {
      disabled = true;
      if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match");
        return;
      }
      await api.changePassword(currentPassword, newPassword);
      alert("Password changed");
    } catch (error) {
      alert("An error occurred");
    } finally {
      disabled = false;
    }
  }
</script>

<div class="flex flex-col w-full">
  <div class="flex">
    <h1 class="font-bold text-xl">Change Password</h1>
  </div>

  <div class="flex flex-col mt-10 space-y-3">
    <input
      type="password"
      name="current-password"
      placeholder="Current Password"
      class="p-2 border-2"
      {disabled}
      bind:value={currentPassword}
    />

    <input
      type="password"
      name="new-password"
      placeholder="New Password"
      class="p-2 border-2"
      {disabled}
      bind:value={newPassword}
    />

    <input
      type="password"
      name="confirm-password"
      placeholder="Confirm Password"
      class="p-2 border-2"
      {disabled}
      bind:value={confirmPassword}
    />
  </div>

  <div class="flex w-full mt-5">
    <button
      type="button"
      class="flex bg-blue-600 px-6 py-3 text-white font-bold"
      {disabled}
      on:click={changePassword}
    >
      Change Password
    </button>
  </div>
</div>
