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
  let searchQuery = "";

  const categories = [
    "All",
    "Stickers",
    "Bookmarks",
    "Keychains",
    "Posters",
    "Cards",
  ];

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

  function handleSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    searchQuery = target.value;
    products.setSearchQuery(searchQuery);
  }

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
      image_url: product.image_url,
    });
    handleCloseModal();
  }

  function toggleCart() {
    isCartOpen = !isCartOpen;
  }
</script>

<!-- WHOLE SECTION -->
<section class="min-h-screen flex flex-col md:flex-row bg-gray-50">
  {#if mounted}
    <aside class="md:w-64 md:h-screen bg-white shadow-lg sticky top-0">
      <nav class="p-4 md:p-6">
        <!-- SEARCH BAR -->
        <div class="mb-6">
          <div class="relative">
            <input
              type="search"
              placeholder="Search products..."
              class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-hot"
              value={searchQuery}
              on:input={handleSearch}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <h2
          class="text-lg font-semibold font-primary mb-4 text-center hidden md:block"
        >
          Categories:
        </h2>
        <ul
          class="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 md:gap-1"
        >
          {#each categories as category}
            <li>
              <button
                class="w-full text-left px-4 py-2 font-primary rounded-lg transition-colors whitespace-nowrap
                  {activeCategory === category
                  ? 'bg-hot/10 text-hot font-medium'
                  : 'hover:bg-gray-100 text-gray-700'}
                "
                on:click={() => filterByCategory(category)}
                aria-current={activeCategory === category ? "page" : undefined}
              >
                {category}
              </button>
            </li>
          {/each}
        </ul>
      </nav>
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

    <!-- CART MODAL -->
    <CartModal isOpen={isCartOpen} on:close={() => (isCartOpen = false)} />
  {/if}
</section>

<style>
</style>
