<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import ProductCard from "$lib/components/shop/ProductCard.svelte";
  import ProductModal from "$lib/components/shop/ProductModal.svelte";
  import type { Product } from "$lib/stores/products";
  import { products } from "$lib/stores/products";
  import { cart } from "$lib/stores/cart";
  import CartModal from "$lib/components/shop/CartModal.svelte";

  let selectedProduct: Product | null = null;
  let activeCategory = "All";
  let mounted = false;
  let isCartOpen = false;

  const categories = [
    "All",
    "Stickers",
    "Bookmarks",
    "Keychains",
    "Posters",
    "Cards",
  ];

  // Get total items in cart
  $: cartItemCount = $cart.reduce((sum, item) => sum + item.quantity, 0);

  onMount(async () => {
    try {
      await products.fetchProducts();
      mounted = true;
    } catch (error) {
      console.error(error);
    }
  });

  onDestroy(() => {
    mounted = false;
    selectedProduct = null;
  });

  function filterByCategory(category: string) {
    if (!mounted) return;
    activeCategory = category;
    products.setCategory(category);
  }

  function handleOpenModal(product: Product) {
    if (!mounted) return;
    selectedProduct = product;
  }

  function handleCloseModal() {
    if (!mounted) return;
    selectedProduct = null;
  }

  function handleAddToCart(event: CustomEvent<Product>) {
    if (!mounted) return;
    const product = event.detail;
    cart.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    handleCloseModal();
  }

  function toggleCart() {
    isCartOpen = !isCartOpen;
  }
</script>

<!-- WHOLE SECTION -->
<section class="flex flex-col md:flex-row">
  {#if mounted}
    <aside
      class="md:w-64 z-[10] md:h-screen w-full md:block bg-white shadow-2xl sticky top-[0] flex flex-col justify-between"
    >
      <ul
        class="gap-4 md:gap-0 text-black p-5 text-sm md:text-base flex md:flex-col flex-row overflow-auto justify-center md:justify-center md:mt-7"
      >
        {#each categories as category}
          <button
            class="md:border-b md:border-slate-300 md:py-3 {activeCategory ===
            category
              ? 'text-red-500 font-bold'
              : ''}"
            on:click={() => filterByCategory(category)}
          >
            {category}
          </button>
        {/each}
      </ul>
    </aside>

    <!-- CONTENT -->
    <div class="flex flex-1 justify-center py-16 px-12 max-sm:p-5 max-md:p-5">
      <section class="overflow-x-auto">
        <div
          class="flex flex-wrap justify-around gap-4 max-sm:gap-2 max-md:gap-2"
        >
          {#each $products as product}
            <ProductCard {product} openModal={handleOpenModal} />
          {/each}
        </div>

        {#if selectedProduct && mounted}
          <ProductModal
            product={selectedProduct}
            isOpen={!!selectedProduct}
            on:close={handleCloseModal}
            on:addToCart={handleAddToCart}
          />
        {/if}
      </section>
    </div>

    <!-- Cart Button (Fixed Position) -->
    <button
      on:click={toggleCart}
      class="fixed bottom-6 right-6 z-40 w-12 h-12 bg-hot text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-600 transition-colors"
      aria-label="Open Cart"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
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
      {#if cartItemCount > 0}
        <span
          class="absolute -top-2 -right-2 bg-white text-hot rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold"
        >
          {cartItemCount}
        </span>
      {/if}
    </button>

    <!-- Cart Modal -->
    <CartModal isOpen={isCartOpen} on:close={() => (isCartOpen = false)} />
  {/if}
</section>

<style>
</style>
