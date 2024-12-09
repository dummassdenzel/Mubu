<script>
  let isDropdownOpen = false;
</script>

<header
  class="sticky z-[1] top-0 duration-200 py-4 px-8 flex w-full items-center justify-between border-b border-solid bg-primary text-black"
>
  <!-- NAVBAR TITLE -->
  <h1 class="font-medium text-2xl ml-5">
    <b class="font-dynapuff">Mubu</b>
  </h1>

  <!-- MENU FOR LARGE SCREENS -->
  <div class="sm:flex items-center gap-10 hidden">
    <a href="/" class="duration-200 hover:text-blue-400">
      <p class="font-macondo">Home</p>
    </a>

    <a href="/shop" class="duration-200 hover:text-blue-400">
      <p class="font-macondo">Shop</p>
    </a>

    <a
      href="/contact"
      class=" relative overflow-hidden px-5 py-2 group rounded-full bg-black text-white"
    >
      <h4 class="relative z-9 font-macondo">Contact Me!</h4>
    </a>
  </div>

  <!-- MENU FOR SMALL SCREENS -->
  <div class="sm:hidden relative">
    <button
      on:click={() => (isDropdownOpen = !isDropdownOpen)}
      class="px-4 py-2 bg-black text-white rounded flex items-center gap-2 hover:text-blue-400 duration-200"
      aria-label="Toggle navigation menu"
    >
      <i class="fas fa-bars"></i>
    </button>
    <!-- DROPDOWN -->
    {#if isDropdownOpen}
      <div
        class="absolute right-0 mt-2 w-48 bg-black border border-gray-200 rounded shadow-lg transition-transform transform origin-top-right duration-200 ease-out scale-100"
      >
        <a href="/" class="duration-200 hover:text-blue-400">
          <p class="font-macondo">Home</p>
        </a>

        <a href="/shop" class="duration-200 hover:text-blue-400">
          <p class="font-macondo">Shop</p>
        </a>
        <a
          href="/contact"
          class="block px-4 py-2 text-white hover:text-yellow-400 duration-200 font-afacad"
        >
          Connect with Us!
        </a>
      </div>
    {/if}
  </div>
</header>
