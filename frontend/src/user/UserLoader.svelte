<script lang="ts">
  import { User } from "./user";
  User.load();

  window.onbeforeunload = function () {
    const remember = localStorage.getItem("rememberUser");
    if (remember === "false") User.logout();
  };
</script>
