<script lang="ts">
</script>

<div
    data-scroll-container
    class="flex flex-col pt-20 px-24 max-sm:px-5 h-screen overflow-hidden relative"
>
    <!-- DIV FOR HEADER TEXTS -->
    <div
        class="w-[50%] max-sm:w-[100%] max-md:w-[100%] max-sm:text-center max-md:text-center"
    >
        <h1 class="text-5xl font-bold mb-4">
            Witty Stickers, Charming Bookmarks, and More!
        </h1>

        <p>
            Explore our handcrafted digital merchandise, designed to bring
            creativity and coziness to your everyday life.
        </p>
    </div>

    <!-- DIV FOR CALL TO ACTION BUTTONS -->
    <div
        class="ml-20 z-10 mt-20 max-sm:ml-0 max-sm:mt-10 flex gap-5 max-sm:justify-center"
    >
        <!-- <a
            href="/shop"
            class="text-white p-5 text-2xl max-sm:text-lg font-bold rounded-xl bg-red-500 shadow-md flex items-center gap-2 hover:bg-red-600 transition-colors"
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
                class="lucide lucide-shopping-cart"
            >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path
                    d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
                />
            </svg>
            Shop Now!
        </a> -->

        <!-- <a
            href="/contact"
            class="text-black p-5 text-2xl max-sm:text-lg font-bold rounded-xl bg-white shadow-md hover:bg-gray-50 transition-colors"
        >
            Contact Me!
        </a> -->
    </div>

    <!-- DIV FOR MASCOT -->
    <div
        class="max-sm:hidden max-md:hidden absolute -right-20 top-1/2 transform -translate-y-1/2 w-[55%]"
    >
        <img src="assets/mascot.png" alt="" />
    </div>

    <!-- DIV FOR BACKGROUND SQUARE -->
    <div class="element"></div>
</div>

<style>
    .element::before {
        content: "";
        position: absolute;
        bottom: -18rem;
        right: -18rem;
        width: 130vh;
        height: 130vh;
        background-color: #fff8a7;
        border-radius: 250px;
        transform: rotate(70deg);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: -1;
    }
</style>
