<script lang="ts">
    import { cart } from "$lib/stores/cart";
    import { fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import { goto } from "$app/navigation";

    const dispatch = createEventDispatcher<{
        close: void;
    }>();

    export let isOpen: boolean;

    // Calculate total
    $: total = cart.getTotal($cart);

    function handleUpdateQuantity(id: number, quantity: number) {
        cart.updateQuantity(id, quantity);
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape" && isOpen) {
            dispatch("close");
        }
    }

    function handleOutsideClick(event: MouseEvent) {
        if ((event.target as HTMLElement).closest(".modal-content")) {
            return;
        }
        dispatch("close");
    }

    function handleCheckout() {
        dispatch("close");
        goto("/checkout");
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
        class="fixed z-50 inset-0 bg-black bg-opacity-50"
        on:click={handleOutsideClick}
        transition:fade={{ duration: 200 }}
    >
        <div
            class="fixed right-0 top-0 h-full w-[400px] max-w-full bg-white shadow-xl"
            transition:fade={{ duration: 150 }}
        >
            <div class="modal-content h-full flex flex-col">
                <!-- Header -->
                <div class="p-4 border-b flex justify-between items-center">
                    <h2 class="text-xl font-bold">Your Cart</h2>
                    <button
                        on:click={() => dispatch("close")}
                        class="text-gray-500 hover:text-gray-700"
                        aria-label="Close cart"
                    >
                        <i class="fa-solid fa-xmark text-xl"></i>
                    </button>
                </div>

                <!-- Cart Items -->
                <div class="flex-1 overflow-y-auto p-4">
                    {#if $cart.length === 0}
                        <div class="text-center py-8">
                            <p class="text-gray-500 mb-4">Your cart is empty</p>
                            <button
                                on:click={() => dispatch("close")}
                                class="text-hot hover:text-red-600"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    {:else}
                        <div class="space-y-4">
                            {#each $cart as item}
                                <div
                                    class="flex gap-4 p-3 bg-white rounded-lg shadow"
                                >
                                    <!-- Product Image -->
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        class="w-20 h-20 object-cover rounded"
                                    />

                                    <!-- Product Details -->
                                    <div class="flex-1">
                                        <h3 class="font-semibold">
                                            {item.name}
                                        </h3>
                                        <p class="text-gray-600">
                                            ₱{Number(item.price).toFixed(2)}
                                        </p>

                                        <!-- Quantity Controls -->
                                        <div
                                            class="flex items-center gap-2 mt-2"
                                        >
                                            <button
                                                on:click={() =>
                                                    handleUpdateQuantity(
                                                        item.id,
                                                        item.quantity - 1,
                                                    )}
                                                class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                                            >
                                                -
                                            </button>
                                            <span class="w-8 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                on:click={() =>
                                                    handleUpdateQuantity(
                                                        item.id,
                                                        item.quantity + 1,
                                                    )}
                                                class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Remove Button -->
                                    <button
                                        on:click={() =>
                                            cart.removeFromCart(item.id)}
                                        class="text-red-500 hover:text-red-700"
                                        aria-label="Remove item"
                                    >
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>

                <!-- Footer with Total and Checkout -->
                {#if $cart.length > 0}
                    <div class="border-t p-4 space-y-4 bg-white">
                        <div class="flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span>₱{total.toFixed(2)}</span>
                        </div>
                        <button
                            on:click={handleCheckout}
                            class="block w-full bg-hot text-white text-center py-3 rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}

<style>
    /* Hide scrollbar for Chrome, Safari and Opera */
    .overflow-y-auto::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .overflow-y-auto {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
</style>
