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

    // Updated click handler
    function handleOutsideClick(event: MouseEvent) {
        // Stop if clicking inside the modal content
        if ((event.target as HTMLElement).closest(".modal-content")) {
            return;
        }
        dispatch("close");
    }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class="fixed z-10 inset-0 bg-black bg-opacity-50 modal-backdrop"
        on:click={handleOutsideClick}
        transition:fade={{ duration: 200 }}
    >
        <div
            class="fixed inset-0 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <!-- Modal Content -->
            <div
                class="modal-content bg-white rounded-lg shadow-lg w-full relative max-h-[80%] max-w-[70%] max-sm:max-w-[90%] grid grid-cols-2 max-md:overflow-hidden max-sm:overflow-auto"
                transition:fade={{ duration: 150 }}
            >
                <!-- Close Button -->
                <button
                    on:click={() => dispatch("close")}
                    class="absolute top-2 right-2 text-gray-600 z-10 hover:text-gray-900 transition-colors"
                    aria-label="Close modal"
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
                        class="lucide lucide-x"
                        ><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
                    >
                </button>

                <!-- Left Side: Image -->
                <div
                    class="col-span-1 max-sm:col-span-2 w-full bg-accent overflow-hidden flex justify-center items-center"
                >
                    <img
                        src={product.image_url}
                        alt={product.name}
                        class="max-h-[50vh] max-w-full object-contain"
                        loading="lazy"
                    />
                </div>

                <!-- Right Side: Details -->
                <div class="col-span-1 max-sm:col-span-2 p-5">
                    <section class="mt-10">
                        <!-- Name & Series -->
                        <div class="mb-6">
                            <h2
                                id="modal-title"
                                class="text-xl md:text-2xl font-bold text-black"
                            >
                                {product.name}
                            </h2>
                            <h3 class="text-black mb-2">
                                {product.series}
                            </h3>
                        </div>

                        <!-- Price -->
                        <h2 class="text-red-600 text-lg md:text-3xl mb-4">
                            ₱{Number(product.price).toFixed(2)}
                        </h2>

                        <!-- Add to Cart Button -->
                        <button
                            class="bg-hot text-white text-2xl py-1 px-10 font-primary mb-10 hover:bg-red-600 transition-colors disabled:bg-gray-400"
                            on:click={handleAddToCart}
                            disabled={!product.stock}
                        >
                            {product.stock ? "Add to Cart" : "Out of Stock"}
                        </button>

                        <!-- Product Details -->
                        <div class="space-y-2 text-black">
                            <p>
                                <strong>Size:</strong>
                                {product.size}
                            </p>
                            <p>
                                <strong>Material:</strong>
                                {product.material}
                            </p>
                            <p>
                                <strong>Description:</strong>
                                {product.description}
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
{/if}
