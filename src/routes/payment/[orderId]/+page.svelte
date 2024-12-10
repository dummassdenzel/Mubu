<script lang="ts">
    import { page } from "$app/stores";
    import { order } from "$lib/stores/order";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    const orderId = Number($page.params.orderId);

    let currentOrder: any = null;
    let paymentFile: File | null = null;
    let loading = false;
    let error = "";
    let success = "";

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
            paymentFile = input.files[0];
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

            success =
                "Payment proof uploaded successfully! We'll process your order soon.";
            setTimeout(() => {
                goto("/shop");
            }, 3000);
        } catch (err) {
            error =
                err instanceof Error
                    ? err.message
                    : "Failed to upload payment proof";
        } finally {
            loading = false;
        }
    }
</script>

<div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Payment Details</h1>

    {#if currentOrder}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Order Summary -->
            <div class="bg-white p-6 rounded-lg shadow">
                <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
                <div class="space-y-4">
                    <p class="text-gray-600">Order #{currentOrder.id}</p>

                    {#each currentOrder.order_items as item}
                        <div class="flex gap-4">
                            <img
                                src={item.product_image || "/placeholder.png"}
                                alt={item.product_name}
                                class="w-16 h-16 object-cover rounded"
                            />
                            <div class="flex-1">
                                <h3 class="font-semibold">
                                    {item.product_name}
                                </h3>
                                <p class="text-gray-600">
                                    {item.quantity} × ₱{Number(
                                        item.price,
                                    ).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    {/each}

                    <div class="border-t pt-4 mt-4">
                        <div class="flex justify-between font-bold">
                            <span>Total:</span>
                            <span
                                >₱{Number(currentOrder.total_amount).toFixed(
                                    2,
                                )}</span
                            >
                        </div>
                    </div>
                </div>
            </div>

            <!-- Payment Upload -->
            <div class="bg-white p-6 rounded-lg shadow">
                <h2 class="text-xl font-semibold mb-4">Upload Payment Proof</h2>

                <div class="mb-6 p-4 bg-yellow-50 rounded-lg">
                    <h3 class="font-semibold text-yellow-800 mb-2">
                        Payment Instructions
                    </h3>
                    <p class="text-sm text-yellow-700">
                        Please transfer the total amount to:
                        <br />
                        <br />
                        Payment Process: GCash
                        <br />
                        Account Name: DE***L MA*Z P.
                        <br />
                        Gcash Number: 09279456060
                        <br />
                        <br />
                        *Shipping fee will be paid by the buyer upon delivery.*
                    </p>
                </div>

                <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                    <div>
                        <label
                            for="payment-proof"
                            class="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Upload Screenshot/Photo of Payment:
                        </label>
                        <input
                            type="file"
                            id="payment-proof"
                            accept="image/*"
                            on:change={handleFileChange}
                            required
                            class="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-hot file:text-white
                                hover:file:bg-red-600"
                        />
                    </div>

                    {#if error}
                        <p class="text-red-500 text-sm">{error}</p>
                    {/if}

                    {#if success}
                        <p class="text-green-500 text-sm">{success}</p>
                    {/if}

                    <button
                        type="submit"
                        class="w-full bg-hot text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors disabled:bg-gray-400"
                        disabled={loading || !paymentFile}
                    >
                        {loading ? "Uploading..." : "Submit Payment Proof"}
                    </button>
                </form>
            </div>
        </div>
    {:else if !error}
        <div class="flex justify-center items-center h-64">
            <div
                class="animate-spin rounded-full h-12 w-12 border-b-2 border-hot"
            ></div>
        </div>
    {/if}
</div>
