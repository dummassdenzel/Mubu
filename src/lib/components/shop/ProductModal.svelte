<script lang="ts">
    import type { Product } from "$lib/stores/products";
    import { cart } from "$lib/stores/cart";
    import { fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import Swal from "sweetalert2";

    const dispatch = createEventDispatcher<{
        close: void;
        addToCart: Product;
    }>();

    export let product: Product;
    export let isOpen: boolean;

    function handleAddToCart() {
        cart.addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
        });

        Swal.fire({
            toast: true,
            position: "bottom-start",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            background: "white",
            color: "black",
            icon: "success",
            iconColor: "#10B981",
            title: `${product.name} added to cart!`,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });

        dispatch("close");
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape" && isOpen) {
            dispatch("close");
        }
    }

    function handleOutsideClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (!target.closest(".modal-content")) {
            dispatch("close");
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <!-- svelte-ignore element_invalid_self_closing_tag -->
    <div
        class="fixed inset-0 z-50 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        on:click={handleOutsideClick}
        transition:fade={{ duration: 200 }}
    >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-50" />

        <!-- Modal Container -->
        <div class="flex min-h-screen items-center justify-center p-4">
            <!-- Modal Content -->
            <div
                class="modal-content relative w-full max-w-4xl rounded-lg bg-white shadow-xl"
                transition:fade={{ duration: 150 }}
            >
                <!-- Close Button -->
                <button
                    type="button"
                    class="absolute right-4 top-4 z-10 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
                    on:click={() => dispatch("close")}
                    aria-label="Close modal"
                >
                    <svg
                        class="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <!-- Content Grid -->
                <div
                    class="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-lg"
                >
                    <!-- Image Section -->
                    <div
                        class="flex h-[400px] items-center justify-center bg-accent p-8"
                    >
                        <img
                            src={product.image_url}
                            alt={product.name}
                            class="h-full w-full object-contain"
                            loading="lazy"
                        />
                    </div>

                    <!-- Details Section -->
                    <div class="flex flex-col p-6">
                        <!-- Product Info -->
                        <div class="mb-auto space-y-4">
                            <div>
                                <h2
                                    id="modal-title"
                                    class="text-2xl font-bold text-gray-900"
                                >
                                    {product.name}
                                </h2>
                                <p class="text-gray-600">{product.series}</p>
                            </div>

                            <p class="text-3xl font-bold text-hot">
                                ₱{Number(product.price).toLocaleString()}.00
                            </p>

                            <!-- Product Details -->
                            <div class="space-y-3 text-gray-700">
                                <p>
                                    <span class="font-semibold">Size:</span>
                                    {product.size}
                                </p>
                                <p>
                                    <span class="font-semibold">Material:</span>
                                    {product.material}
                                </p>
                                <p>
                                    <span class="font-semibold"
                                        >Description:</span
                                    >
                                    {product.description}
                                </p>
                            </div>
                        </div>

                        <!-- Add to Cart Button -->
                        <button
                            type="button"
                            class="mt-6 w-full rounded-md bg-hot px-6 py-3 text-center text-lg font-semibold text-white transition-colors hover:bg-red-600 disabled:bg-gray-400"
                            on:click={handleAddToCart}
                            disabled={!product.stock}
                        >
                            {product.stock ? "Add to Cart" : "Out of Stock"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
