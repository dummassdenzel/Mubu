<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { fade } from "svelte/transition";

    export let images: { url: string; name: string; price: number }[] = [];
    export let autoplayInterval = 3000;
    export let showControls = true;

    let currentIndex = 0;
    let intervalId: number;

    const next = () => {
        currentIndex = (currentIndex + 1) % images.length;
    };

    const prev = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
    };

    const startAutoplay = () => {
        intervalId = setInterval(next, autoplayInterval);
    };

    const stopAutoplay = () => {
        if (intervalId) clearInterval(intervalId);
    };

    onMount(() => {
        startAutoplay();
    });

    onDestroy(() => {
        stopAutoplay();
    });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="relative w-full overflow-hidden rounded-lg"
    on:mouseenter={stopAutoplay}
    on:mouseleave={startAutoplay}
>
    <!-- Main Image Container -->
    <div class="relative aspect-[16/9] w-full">
        {#each images as image, i}
            {#if i === currentIndex}
                <div
                    transition:fade={{ duration: 300 }}
                    class="absolute inset-0 flex items-center justify-center"
                >
                    <img
                        src={image.url}
                        alt={image.name}
                        class="h-full w-full object-contain"
                    />
                    <!-- Product Info Overlay -->
                    <div
                        class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white"
                    >
                        <h3 class="text-lg font-semibold">{image.name}</h3>
                        <p class="text-sm">₱{image.price.toFixed(2)}</p>
                    </div>
                </div>
            {/if}
        {/each}
    </div>

    <!-- Navigation Dots -->
    <div
        class="absolute bottom-16 left-0 right-0 flex justify-center gap-2 p-2"
    >
        {#each images as _, i}
            <!-- svelte-ignore element_invalid_self_closing_tag -->
            <button
                class="h-2 w-2 rounded-full transition-all {i === currentIndex
                    ? 'bg-white w-4'
                    : 'bg-white/50'}"
                on:click={() => (currentIndex = i)}
                aria-label="Go to slide {i + 1}"
            />
        {/each}
    </div>

    <!-- Navigation Arrows -->
    {#if showControls}
        <button
            class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/75"
            on:click={prev}
            aria-label="Previous slide"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="h-6 w-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                />
            </svg>
        </button>
        <button
            class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/75"
            on:click={next}
            aria-label="Next slide"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="h-6 w-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
            </svg>
        </button>
    {/if}
</div>
