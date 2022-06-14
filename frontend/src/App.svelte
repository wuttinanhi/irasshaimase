<script lang="ts">
  import AppRouter from "./AppRouter.svelte";
  import UserLoader from "./user/UserLoader.svelte";
</script>

<AppRouter />
<UserLoader />

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
