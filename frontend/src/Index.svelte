<script lang="ts">
  import Banner from "./common/Banner.svelte";
  import Footer from "./common/Footer.svelte";
  import Navbar from "./common/Navbar.svelte";
  import Store from "./store/Store.svelte";
</script>

<Navbar />

<div class="flex flex-col pt-16 px-96 mb-10">
  <Banner />
  <Store />
</div>

<Footer />
