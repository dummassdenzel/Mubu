<script lang="ts">
    import { cart } from "$lib/stores/cart";
    import { order } from "$lib/stores/order";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let loading = false;
    let error = "";

    // Form data
    let formData = {
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        shipping_address: "",
    };

    // Redirect if cart is empty
    onMount(() => {
        if ($cart.length === 0) {
            goto("/shop");
        }
    });

    async function handleSubmit() {
        try {
            loading = true;
            error = "";

            // Create order
            const newOrder = await order.createOrder(formData, $cart);

            // Clear cart after successful order
            cart.clearCart();

            // Redirect to payment page
            goto(`/payment/${newOrder.id}`);
        } catch (err) {
            error =
                err instanceof Error ? err.message : "Failed to create order";
        } finally {
            loading = false;
        }
    }

    $: total = cart.getTotal($cart);
</script>

<div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Checkout</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Order Summary -->
        <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
            <div class="space-y-4">
                {#each $cart as item}
                    <div class="flex gap-4">
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            class="w-16 h-16 object-cover rounded"
                        />
                        <div class="flex-1">
                            <h3 class="font-semibold">{item.name}</h3>
                            <p class="text-gray-600">
                                {item.quantity} × ₱{Number(item.price).toFixed(
                                    2,
                                )}
                            </p>
                        </div>
                    </div>
                {/each}

                <div class="border-t pt-4 mt-4">
                    <div class="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>₱{total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Checkout Form -->
        <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">Shipping Information</h2>
            <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                <div>
                    <label
                        for="name"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        bind:value={formData.customer_name}
                        required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hot focus:ring-hot"
                    />
                </div>

                <div>
                    <label
                        for="email"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        bind:value={formData.customer_email}
                        required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hot focus:ring-hot"
                    />
                </div>

                <div>
                    <label
                        for="phone"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Phone
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        bind:value={formData.customer_phone}
                        required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hot focus:ring-hot"
                    />
                </div>

                <div>
                    <label
                        for="address"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Shipping Address
                    </label>
                    <textarea
                        id="address"
                        bind:value={formData.shipping_address}
                        required
                        rows="3"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hot focus:ring-hot"
                    ></textarea>
                </div>

                {#if error}
                    <p class="text-red-500 text-sm">{error}</p>
                {/if}

                <button
                    type="submit"
                    class="w-full bg-hot text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors disabled:bg-gray-400"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Place Order"}
                </button>
            </form>
        </div>
    </div>
</div>
