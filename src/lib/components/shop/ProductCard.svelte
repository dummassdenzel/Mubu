<script lang="ts">
    import { onMount } from "svelte";
    import type { Product } from "$lib/stores/products";

    export let product: Product;
    export let openModal: (product: Product) => void;

    let imageLoaded = false;

    function handleImageLoad() {
        imageLoaded = true;
    }
</script>

<div
    role="button"
    on:click={() => openModal(product)}
    on:keydown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openModal(product);
        }
    }}
    tabindex="0"
    class="group p-4 sm:p-6 md:p-4 flex flex-col gap-4 rounded-lg border border-transparent hover:border-black cursor-pointer transition-all duration-200"
    aria-label={`View details for ${product.name}`}
>
    <!-- Image Section with loading state -->
    <div
        class="bg-accent h-[40vh] w-[35vh] max-sm:h-[30vh] max-sm:w-[25vh] px-4 overflow-hidden relative"
    >
        {#if !imageLoaded}
            <div
                class="absolute inset-0 flex items-center justify-center bg-gray-100"
            >
                <!-- svelte-ignore element_invalid_self_closing_tag -->
                <div class="animate-pulse w-full h-full bg-gray-200" />
            </div>
        {/if}
        <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            on:load={handleImageLoad}
            class="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-200 {!imageLoaded
                ? 'opacity-0'
                : 'opacity-100'}"
        />
    </div>

    <!-- Product Details -->
    <div class="mt-2 space-y-2">
        <p class="text-base text-gray-600">{product.series}</p>
        <h3
            class="font-medium text-xl sm:text-2xl md:text-sm font-afacad line-clamp-2"
        >
            {product.name}
        </h3>
        <p class="text-base font-semibold">
            ₱{Number(product.price).toLocaleString()}.00
        </p>
    </div>

    <slot />
</div>
