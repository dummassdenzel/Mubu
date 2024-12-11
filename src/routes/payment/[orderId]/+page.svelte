<script lang="ts">
    import { page } from "$app/stores";
    import { order } from "$lib/stores/order";
    import Receipt from "$lib/components/shop/Receipt.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    const orderId = Number($page.params.orderId);

    let currentOrder: any = null;
    let paymentFile: File | null = null;
    let loading = false;
    let error = "";
    let showReceipt = false;

    onMount(async () => {
        try {
            currentOrder = await order.getOrder(orderId);
        } catch (err) {
            error = err instanceof Error ? err.message : "Failed to load order";
            goto("/shop");
        }
    });

    function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const maxSize = 7 * 1024 * 1024; // 7MB in bytes

            if (file.size > maxSize) {
                error = "File is too large. Maximum size is 7MB";
                input.value = ""; // Clear the input
                paymentFile = null;
                return;
            }

            paymentFile = file;
            error = ""; // Clear any previous error
        }
    }

    async function handleSubmit() {
        if (!paymentFile) {
            error = "Please select a payment proof file";
            return;
        }

        try {
            loading = true;
            error = "";

            await order.uploadPaymentProof(orderId, paymentFile);

            currentOrder = await order.getReceipt(orderId);

            showReceipt = true;
        } catch (err) {
            error =
                err instanceof Error
                    ? err.message
                    : "Failed to upload payment proof";
        } finally {
            loading = false;
        }
    }

    function handleCloseReceipt() {
        showReceipt = false;
        goto("/shop");
    }
</script>

<div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-5xl mx-auto px-4">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Payment Details:</h1>

        {#if currentOrder}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Left Column: Order Details -->
                <div class="space-y-6">
                    <!-- Order Summary Card -->
                    <div class="bg-white p-6 rounded-lg shadow-sm">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-xl font-semibold">Order Summary</h2>
                            <span
                                class="px-3 py-1 rounded-full text-sm font-medium
                                {currentOrder.order_status === 'PENDING'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : currentOrder.order_status ===
                                        'PENDING_VERIFICATION'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-gray-100 text-gray-800'}"
                            >
                                {currentOrder.order_status
                                    ?.toLowerCase()
                                    .replace("_", " ")}
                            </span>
                        </div>

                        <p class="text-gray-600 mb-4">
                            Order #{currentOrder.id}
                        </p>

                        <div class="divide-y">
                            {#each currentOrder.order_items as item}
                                <div class="py-4 flex items-center gap-4">
                                    <img
                                        src={item.image_url ||
                                            "/placeholder.png"}
                                        alt={item.product_name}
                                        class="w-20 h-20 object-contain bg-accent rounded"
                                    />
                                    <div class="flex-1 min-w-0">
                                        <h3
                                            class="font-medium text-gray-900 truncate"
                                        >
                                            {item.product_name}
                                        </h3>
                                        <div class="text-gray-500">
                                            Quantity: {item.quantity}
                                        </div>
                                        <div class="text-gray-900">
                                            ₱{(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>

                        <div class="border-t mt-4 pt-4">
                            <div
                                class="flex justify-between items-center text-lg"
                            >
                                <span class="font-medium">Total Amount</span>
                                <span class="font-bold text-hot"
                                    >₱{Number(
                                        currentOrder.total_amount,
                                    ).toFixed(2)}</span
                                >
                            </div>
                            <p class="text-sm text-gray-500 mt-2">
                                *Shipping fee will be paid upon delivery
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Payment Upload -->
                <div class="space-y-6">
                    <!-- Payment Instructions Card -->
                    <div class="bg-white p-6 rounded-lg shadow-sm">
                        <h2 class="text-xl font-semibold mb-6">
                            Payment Instructions
                        </h2>

                        <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                            <div class="space-y-3 text-sm text-yellow-800">
                                <p class="font-medium">
                                    Please transfer the total amount to:
                                </p>
                                <div class="pl-4 space-y-1">
                                    <p>Payment Process: GCash</p>
                                    <p>Account Name: DE***L MA*Z P.</p>
                                    <p>Gcash Number: 09279456060</p>
                                </div>
                                <p class="text-yellow-600 italic">
                                    *Shipping fee will be paid by the buyer upon
                                    delivery.*
                                </p>
                            </div>
                        </div>

                        <form
                            on:submit|preventDefault={handleSubmit}
                            class="space-y-6"
                        >
                            <div>
                                <label
                                    for="payment-proof"
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Upload Screenshot/Photo of Payment: <span
                                        class="text-gray-500">(Max 7MB)</span
                                    >
                                </label>
                                <input
                                    type="file"
                                    id="payment-proof"
                                    accept="image/*"
                                    on:change={handleFileChange}
                                    required
                                    class="w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-medium
                                        file:bg-hot file:text-white
                                        hover:file:bg-red-600
                                        cursor-pointer"
                                />
                            </div>

                            {#if error}
                                <div class="text-red-500 text-sm">{error}</div>
                            {/if}

                            <button
                                type="submit"
                                class="w-full bg-hot text-white py-3 px-4 rounded-md hover:bg-red-600 transition-colors disabled:bg-gray-400 font-medium"
                                disabled={loading || !paymentFile}
                            >
                                {loading
                                    ? "Uploading..."
                                    : "Submit Payment Proof"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        {:else if !error}
            <div class="flex justify-center items-center h-64">
                <!-- svelte-ignore element_invalid_self_closing_tag -->
                <div
                    class="animate-spin rounded-full h-12 w-12 border-b-2 border-hot"
                />
            </div>
        {/if}
    </div>
</div>

{#if showReceipt}
    <Receipt order={currentOrder} onClose={handleCloseReceipt} />
{/if}
