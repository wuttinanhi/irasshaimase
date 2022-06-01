<script lang="ts">
  import Banner from "./common/Banner.svelte";
  import Footer from "./common/Footer.svelte";
  import Navbar from "./common/Navbar.svelte";
  import Store from "./store/Store.svelte";
</script>

<Navbar />

<div class="flex flex-col md:pt-16 md:px-96 md:mb-10">
  <Banner />
  <Store />
</div>

<Footer />
