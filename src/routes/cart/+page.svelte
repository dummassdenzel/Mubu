<script lang="ts">
    import { cart } from "$lib/stores/cart";

    function handleUpdateQuantity(id: number, newQuantity: number) {
        cart.updateQuantity(id, newQuantity);
    }

    $: total = cart.getTotal($cart);
</script>

<div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>

    {#if $cart.length === 0}
        <div class="text-center py-12">
            <p class="text-gray-500 mb-4">Your cart is empty</p>
            <a
                href="/shop"
                class="inline-block bg-hot text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
                Continue Shopping
            </a>
        </div>
    {:else}
        <div class="grid grid-cols-1 gap-6">
            {#each $cart as item}
                <div
                    class="flex items-center gap-4 p-4 bg-white rounded-lg shadow"
                >
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        class="w-24 h-24 object-cover rounded"
                    />
                    <div class="flex-1">
                        <h3 class="text-lg font-semibold">{item.name}</h3>
                        <p class="text-gray-600">
                            ₱{Number(item.price).toFixed(2)}
                        </p>
                    </div>
                    <div class="flex items-center gap-2">
                        <button
                            on:click={() =>
                                handleUpdateQuantity(
                                    item.id,
                                    item.quantity - 1,
                                )}
                            class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                        >
                            -
                        </button>
                        <span class="w-8 text-center">{item.quantity}</span>
                        <button
                            on:click={() =>
                                handleUpdateQuantity(
                                    item.id,
                                    item.quantity + 1,
                                )}
                            class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                        >
                            +
                        </button>
                    </div>
                    <button
                        on:click={() => cart.removeFromCart(item.id)}
                        class="text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Remove item"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            {/each}

            <div class="mt-8 flex justify-between items-center">
                <div class="text-xl font-bold">
                    Total: ₱{total.toFixed(2)}
                </div>
                <div class="flex gap-4">
                    <a
                        href="/shop"
                        class="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        Continue Shopping
                    </a>
                    <button
                        class="bg-hot text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                        on:click={() => {
                            /* Implement checkout */
                        }}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>
