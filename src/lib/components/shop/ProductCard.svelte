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
    class="group p-4 flex flex-col gap-4 rounded-lg border border-transparent hover:border-black cursor-pointer transition-all duration-200 w-[280px] max-sm:w-[160px] max-lg:w-[200px]"
    aria-label={`View details for ${product.name}`}
>
    <!-- Image Section with loading state -->
    <div
        class="bg-accent aspect-square w-full flex items-center justify-center overflow-hidden relative"
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
            class="max-w-[80%] max-h-[80%] object-contain transform group-hover:scale-105 transition-transform duration-200 {!imageLoaded
                ? 'opacity-0'
                : 'opacity-100'}"
        />
    </div>

    <!-- Product Details -->
    <div class="mt-2 space-y-2 flex-1">
        <p class="text-base text-gray-600">{product.series}</p>
        <h3 class="font-medium text-lg font-afacad line-clamp-2 h-[3em]">
            {product.name}
        </h3>
        <!-- <h3 class="font-medium text-lg font-afacad line-clamp-2 h-[3em]">
            {product.series}
        </h3> -->
        <p class="text-base font-semibold">
            ₱{Number(product.price).toLocaleString()}.00
        </p>
    </div>

    <slot />
</div>
