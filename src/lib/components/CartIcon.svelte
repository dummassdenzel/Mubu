<script lang="ts">
    import { cart } from "$lib/stores/cart";

    // Calculate total items in cart
    $: totalItems = $cart.reduce((sum, item) => sum + item.quantity, 0);
</script>

<div class="relative">
    <a href="/cart" class="text-gray-700 hover:text-gray-900">
        <i class="fa-solid fa-shopping-cart text-2xl"></i>
        {#if totalItems > 0}
            <span
                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
                {totalItems}
            </span>
        {/if}
    </a>
</div>
