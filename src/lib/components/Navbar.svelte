<script lang="ts">
  import { cart } from "$lib/stores/cart";
  import CartModal from "$lib/components/shop/CartModal.svelte";

  let isDropdownOpen = false;
  let isCartOpen = false;

  // Get total items in cart
  $: cartItemCount = $cart.reduce((sum, item) => sum + item.quantity, 0);

  function toggleCart() {
    isCartOpen = !isCartOpen;
  }
</script>

<header
  class="sticky z-[50] top-0 duration-200 py-4 px-8 flex w-full items-center justify-between border-b border-solid bg-primary text-black"
>
  <!-- NAVBAR TITLE -->
  <h1 class="text-4xl ml-5 font-bold font-primary">MUBU</h1>

  <!-- MENU FOR LARGE SCREENS -->
  <div class="sm:flex items-center gap-10 hidden">
    <a
      href="/"
      class="duration-200 hover:text-blue-400 flex items-center gap-2"
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
        class="lucide -mt-0.5 lucide-house"
        ><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path
          d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        /></svg
      >
      <span class="font-primary font-semibold">Home</span>
    </a>

    <a
      href="/shop"
      class="duration-200 hover:text-blue-400 flex items-center gap-2"
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
        class="lucide lucide-shopping-basket"
        ><path d="m15 11-1 9" /><path d="m19 11-4-7" /><path
          d="M2 11h20"
        /><path
          d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"
        /><path d="M4.5 15.5h15" /><path d="m5 11 4-7" /><path
          d="m9 11 1 9"
        /></svg
      >
      <p class="font-primary font-semibold">Shop</p>
    </a>

    <!-- Cart Button -->
    <button
      on:click={toggleCart}
      class="relative overflow-hidden px-5 py-2 group rounded-full bg-hot text-white hover:text-blue-400 duration-200"
    >
      <div class="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-shopping-cart"
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path
            d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
          />
        </svg>
        <span class="font-primary font-medium">Your Cart</span>
        {#if cartItemCount > 0}
          <span
            class="bg-white text-hot rounded-full w-5 h-5 flex items-center justify-center text-xs"
          >
            {cartItemCount}
          </span>
        {/if}
      </div>
    </button>
  </div>

  <!-- MENU FOR SMALL SCREENS -->
  <div class="sm:hidden relative text-white">
    <button
      on:click={() => (isDropdownOpen = !isDropdownOpen)}
      class="px-4 py-2 bg-black text-white rounded flex items-center gap-2 hover:text-blue-400 duration-200"
      aria-label="Toggle navigation menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-menu"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    </button>
    <!-- DROPDOWN -->
    {#if isDropdownOpen}
      <div
        class="absolute space-y-2 right-0 mt-2 w-48 py-2 bg-black border border-gray-200 rounded shadow-lg transition-transform transform origin-top-right duration-200 ease-out scale-100"
      >
        <a href="/" class="block ms-4 duration-200 hover:text-blue-400">
          Home
        </a>

        <a href="/shop" class="block ms-4 duration-200 hover:text-blue-400">
          Shop
        </a>
        <!-- Cart Button for Mobile -->
        <button
          on:click={() => {
            toggleCart();
            isDropdownOpen = false;
          }}
          class="block w-full text-left ms-4 duration-200 hover:text-blue-400"
        >
          <div class="flex items-center gap-2">
            <span>Your Cart</span>
            {#if cartItemCount > 0}
              <span
                class="bg-hot text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                {cartItemCount}
              </span>
            {/if}
          </div>
        </button>
      </div>
    {/if}
  </div>
</header>

<!-- Cart Modal -->
<CartModal isOpen={isCartOpen} on:close={() => (isCartOpen = false)} />
