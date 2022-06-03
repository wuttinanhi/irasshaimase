<script lang="ts">
  import Banner from "./common/Banner.svelte";
  import Footer from "./common/Footer.svelte";
  import Navbar from "./common/Navbar.svelte";
  import Store from "./store/Store.svelte";
</script>

<Navbar />

<div class="flex flex-col lg:pt-16 lg:px-32 2xl:pt-16 2xl:px-96">
  <Banner />
  <Store />
</div>

<Footer />
