<script lang="ts">
    import { fade } from "svelte/transition";
    import { jsPDF } from "jspdf";
    import html2canvas from "html2canvas";

    export let order: any;
    export let onClose: () => void;
    let receiptContent: HTMLDivElement;

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = async () => {
        try {
            const canvas = await html2canvas(receiptContent, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
                windowWidth: receiptContent.scrollWidth + 50,
                windowHeight: receiptContent.scrollHeight + 50,
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`MUBU-Receipt-${order.receipt_number}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };
</script>

<div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
    transition:fade
>
    <div
        class="bg-white p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl print:shadow-none"
    >
        <div bind:this={receiptContent} class="p-8 min-w-[500px]">
            <!-- Receipt Header -->
            <div class="text-center mb-8">
                <h2 class="text-2xl font-bold">Payment Receipt</h2>
                <p class="text-gray-600">MUBU Art Shop</p>
            </div>

            <!-- Receipt Details -->
            <div class="space-y-6">
                <!-- Order Info -->
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p class="text-gray-600">Receipt No:</p>
                        <p class="font-semibold">
                            {order.receipt_number || "N/A"}
                        </p>
                    </div>
                    <div class="text-right">
                        <p class="text-gray-600">Date:</p>
                        <p class="font-semibold">
                            {formatDate(order.payment_date)}
                        </p>
                    </div>
                </div>

                <!-- Customer Info -->
                <div class="border-t pt-4">
                    <h3 class="font-semibold mb-2">Customer Details</h3>
                    <p>{order.customer_name}</p>
                    <p>{order.customer_email}</p>
                    <p class="text-gray-600">{order.shipping_address}</p>
                </div>

                <!-- Order Items -->
                <div class="border-t pt-4">
                    <h3 class="font-semibold mb-2">Order Items</h3>
                    <table class="w-full">
                        <thead>
                            <tr class="text-left text-gray-600">
                                <th class="py-2">Item</th>
                                <th class="py-2 text-right">Qty</th>
                                <th class="py-2 text-right">Price</th>
                                <th class="py-2 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody class="border-t">
                            {#each order.order_items as item}
                                <tr>
                                    <td class="py-2">{item.product_name}</td>
                                    <td class="py-2 text-right"
                                        >{item.quantity}</td
                                    >
                                    <td class="py-2 text-right"
                                        >₱{Number(item.price).toFixed(2)}</td
                                    >
                                    <td class="py-2 text-right"
                                        >₱{Number(
                                            item.quantity * item.price,
                                        ).toFixed(2)}</td
                                    >
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <!-- Total -->
                <div class="border-t pt-4">
                    <div class="flex justify-between">
                        <span class="font-semibold">Total Amount:</span>
                        <span class="font-semibold"
                            >₱{Number(order.total_amount).toFixed(2)}</span
                        >
                    </div>
                    <p class="text-sm text-gray-600 mt-2">
                        *Shipping fee will be paid upon delivery
                    </p>
                </div>
            </div>
        </div>

        <!-- Actions -->
        <div class="mt-8 flex justify-end gap-4 print:hidden">
            <button
                class="px-4 py-2 text-gray-600 hover:text-gray-800"
                on:click={onClose}
            >
                Close
            </button>
            <button
                class="px-4 py-2 text-gray-600 hover:text-gray-800"
                on:click={handlePrint}
            >
                Print
            </button>
            <button
                class="px-4 py-2 bg-hot text-white rounded hover:bg-red-600"
                on:click={handleDownload}
            >
                Download PDF
            </button>
        </div>
    </div>
</div>

<style>
    @media print {
        :global(body > *:not(.receipt-modal)) {
            display: none;
        }
    }
</style>
