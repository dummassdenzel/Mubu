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
  <h1 class="font-medium text-2xl ml-5">
    <b class="font-dynapuff">Mubu</b>
  </h1>

  <!-- MENU FOR LARGE SCREENS -->
  <div class="sm:flex items-center gap-10 hidden">
    <a href="/" class="duration-200 hover:text-blue-400">
      <p class="font-secondary text=lg">Home</p>
    </a>

    <a href="/shop" class="duration-200 hover:text-blue-400">
      <p class="font-secondary text=lg">Shop</p>
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
        <span class="font-secondary">Your Cart</span>
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
