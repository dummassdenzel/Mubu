<script lang="ts">
    import { cart } from "$lib/stores/cart";
    import { order } from "$lib/stores/order";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import Swal from "sweetalert2";

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

            // Show success message
            await Swal.fire({
                title: "Order Placed!",
                text: "You will be redirected to the payment page.",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#BF3D3D",
            });

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

<div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-5xl mx-auto px-4">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Checkout:</h1>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Left Column: Order Summary -->
            <div class="space-y-6">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
                    <div class="divide-y">
                        {#each $cart as item}
                            <div class="py-4 flex items-center gap-4">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    class="w-20 h-20 object-contain bg-accent rounded"
                                />
                                <div class="flex-1 min-w-0">
                                    <h3
                                        class="font-medium text-gray-900 truncate"
                                    >
                                        {item.name}
                                    </h3>
                                    <div class="text-gray-500">
                                        Quantity: {item.quantity}
                                    </div>
                                    <div class="text-gray-900">
                                        ₱{(item.price * item.quantity).toFixed(
                                            2,
                                        )}
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>

                    <div class="border-t mt-4 pt-4">
                        <div class="flex justify-between items-center text-lg">
                            <span class="font-medium">Total</span>
                            <span class="font-bold text-hot"
                                >₱{total.toFixed(2)}</span
                            >
                        </div>
                        <p class="text-sm text-gray-500 mt-2">
                            *Shipping fee will be paid upon delivery
                        </p>
                    </div>
                </div>
            </div>

            <!-- Right Column: Shipping Information -->
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <h2 class="text-xl font-semibold mb-6">Shipping Information</h2>
                <form on:submit|preventDefault={handleSubmit} class="space-y-6">
                    <div>
                        <label
                            for="name"
                            class="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            bind:value={formData.customer_name}
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-hot focus:border-hot"
                            placeholder="Full Name"
                        />
                    </div>

                    <div>
                        <label
                            for="email"
                            class="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            bind:value={formData.customer_email}
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-hot focus:border-hot"
                            placeholder="dinsil@example.com"
                        />
                    </div>

                    <div>
                        <label
                            for="phone"
                            class="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            bind:value={formData.customer_phone}
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-hot focus:border-hot"
                            placeholder="09XX XXX XXXX"
                        />
                    </div>

                    <div>
                        <label
                            for="address"
                            class="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Complete Shipping Address
                        </label>
                        <!-- svelte-ignore element_invalid_self_closing_tag -->
                        <textarea
                            id="address"
                            bind:value={formData.shipping_address}
                            required
                            rows="3"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-hot focus:border-hot"
                            placeholder="House/Unit Number, Street, Barangay, City/Municipality, Province, ZIP Code"
                        />
                    </div>

                    {#if error}
                        <div class="text-red-500 text-sm">{error}</div>
                    {/if}

                    <button
                        type="submit"
                        class="w-full bg-hot text-white py-3 px-4 rounded-md hover:bg-red-600 transition-colors disabled:bg-gray-400 font-medium"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Place Order"}
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
