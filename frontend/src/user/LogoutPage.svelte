<script lang="ts">
  import { User } from "./user";
  User.logout();
  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
</script>
