<script>
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import "../app.css";

  // Variables to track scroll position and window dimensions
  let y = 0;
  let innerWidth = 0;
  let innerHeight = 0;

  // Function to scroll to the top of the page
  function goTop() {
    document.body.scrollIntoView();
  }
</script>

<section
  class="container relative flex flex-col max-w-[1400px] mx-auto w-full text-sm sm:text-base min-h-screen z-[2]"
>
  <!-- SCROLL TO TOP BUTTON -->
  <div
    class={"fixed bottom-0 w-full right-0 duration-200 flex p-10 z-[10] " +
      (y > 0
        ? " opacity-full pointer-events-auto"
        : " pointer-events-none opacity-0")}
  >
    <button
      on:click={goTop}
      class="ml-auto rounded-full bg-black text-white p-2 hover:bg-hot hover:text-white duration-200 cursor-pointer aspect-square grid place-items-center"
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-arrow-up"
        ><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg
      >
    </button>
  </div>

  <Navbar />
  <slot />
</section>

<Footer />
<!-- Bind scroll position and window dimensions -->
<svelte:window bind:scrollY={y} bind:innerHeight bind:innerWidth />
