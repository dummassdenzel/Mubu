<script lang="ts">
  import { onMount } from "svelte";
  import ProductCard from "$lib/components/shop/ProductCard.svelte";
  import ProductModal from "$lib/components/shop/ProductModal.svelte";
  import type { Product } from "$lib/stores/products";
  import { products } from "$lib/stores/products";

  let selectedProduct: Product | null = null;
  let activeCategory = "All";

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
    } catch (error) {
      console.error(error);
    }
  });

  function filterByCategory(category: string) {
    activeCategory = category;
    products.setCategory(category);
  }

  function handleOpenModal(product: Product) {
    selectedProduct = product;
  }

  function handleCloseModal() {
    selectedProduct = null;
  }

  function handleAddToCart(event: CustomEvent<Product>) {
    const product = event.detail;
    // TODO: Implement add to cart functionality
    console.log("Adding to cart:", product);
    handleCloseModal();
  }
</script>

<!-- WHOLE SECTION -->
<section class="flex flex-col md:flex-row">
  <aside
    class="md:w-64 md:h-screen w-full md:block bg-white shadow-2xl sticky top-[0]"
  >
    <ul
      class="gap-4 md:gap-0 text-black p-5 text-sm md:text-xl flex md:flex-col flex-row overflow-auto justify-center md:justify-center md:mt-10"
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
    <!--  ITEMS -->
    <section class="overflow-x-auto">
      <div
        class="flex flex-wrap justify-evenly gap-4 max-sm:gap-2 max-md:gap-2"
      >
        {#each $products as product}
          <ProductCard {product} openModal={handleOpenModal} />
        {/each}
      </div>

      {#if selectedProduct}
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          on:close={handleCloseModal}
          on:addToCart={handleAddToCart}
        />
      {/if}
    </section>
  </div>
</section>

<style>
</style>
