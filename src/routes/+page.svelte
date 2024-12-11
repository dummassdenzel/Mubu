<script lang="ts">
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";

    let isLoaded = false;

    onMount(() => {
        isLoaded = true;
    });
</script>

<div class="min-h-screen overflow-x-hidden bg-white">
    <!-- Hero Section -->
    <section class="relative h-screen bg-white">
        <!-- Background Elements -->
        <div class="absolute inset-0 overflow-hidden">
            <!-- Wave Background -->
            <svg
                class="absolute bottom-0 w-full"
                style="transform: translateY(1px)"
                viewBox="0 0 1440 800"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#fff8a7"
                    fill-opacity="0.8"
                    d="M0,400C180,550,360,650,720,550C1080,450,1260,500,1440,500L1440,900L720,900L0,900Z"
                >
                    <animate
                        attributeName="d"
                        dur="10s"
                        repeatCount="indefinite"
                        values="M0,400C180,550,360,650,720,550C1080,450,1260,500,1440,500L1440,900L720,900L0,900Z;
                                M0,500C180,400,360,350,720,450C1080,550,1260,450,1440,400L1440,900L720,900L0,900Z;
                                M0,400C180,550,360,650,720,550C1080,450,1260,500,1440,500L1440,900L720,900L0,900Z"
                    />
                </path>
            </svg>
        </div>

        <!-- Main Content -->
        <div
            class="relative mx-auto grid h-full max-w-7xl grid-cols-1 items-center gap-8 px-4 lg:grid-cols-2"
        >
            <!-- Left Column: Text Content -->
            {#if isLoaded}
                <div
                    class="z-10 space-y-6 lg:pr-12"
                    in:fly={{ y: 50, duration: 1000 }}
                >
                    <h1
                        class="font-afacad text-5xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
                    >
                        Witty Stickers, Charming Bookmarks, and More!
                    </h1>

                    <p class="max-w-2xl text-lg text-gray-600">
                        Explore my digitally illustrated merchandise, designed
                        to bring creativity and charm to your everyday life.
                    </p>

                    <div class="flex flex-col gap-4 sm:ml-4 pt-4 sm:flex-row">
                        <a
                            href="/shop"
                            class="group inline-flex items-center justify-center gap-2 rounded-lg bg-hot px-7 py-4 text-xl font-semibold text-white transition-all hover:bg-red-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
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
                            Shop Now
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 transition-transform group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </a>
                        <!-- <a
                            href="/contact"
                            class="inline-flex items-center justify-center rounded-lg border-2 border-gray-900 bg-transparent px-6 py-3 text-lg font-semibold text-gray-900 transition-all hover:bg-gray-900 hover:text-white"
                        >
                            Contact Me
                        </a> -->
                    </div>
                </div>

                <!-- Right Column: Image -->
                <div
                    class="relative hidden lg:block"
                    in:fly={{ x: 50, duration: 1000 }}
                >
                    <img
                        src="assets/gokoru.png"
                        alt="Mascot illustration"
                        class="h-auto w-[120%] max-w-2xl transform object-contain"
                    />
                </div>
            {/if}
        </div>
    </section>

    <!-- Featured Products Section -->
    <section class="bg-gray-50 pt-24 pb-24 -mt-1">
        <div class="mx-auto max-w-7xl px-4">
            <div class="text-center">
                <h2
                    class="font-afacad text-3xl font-bold text-gray-900 sm:text-4xl"
                >
                    Featured Products
                </h2>
                <p class="mt-4 text-lg text-gray-600">
                    Check out some of our most popular items
                </p>
            </div>

            <!-- Add your featured products grid here -->
            <div
                class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
                <!-- Featured product cards can go here -->
            </div>

            <div class="mt-12 text-center">
                <a
                    href="/shop"
                    class="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-lg font-semibold text-white transition-all hover:bg-gray-800"
                >
                    View All Products
                </a>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="bg-white py-24">
        <div
            class="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 lg:grid-cols-2"
        >
            <div class="space-y-6">
                <h2
                    class="font-afacad text-3xl font-bold text-gray-900 sm:text-4xl"
                >
                    About My Art
                </h2>
                <p class="text-lg text-gray-600">
                    Each piece is carefully crafted with attention to detail and
                    a touch of whimsy. From cute stickers to elegant bookmarks,
                    every item tells its own unique story.
                </p>
                <!-- <a
                    href="/contact"
                    class="inline-flex items-center text-hot hover:text-red-600"
                >
                    Learn more about my work →
                </a> -->
            </div>
            <!-- Add an about section image or gallery here -->
        </div>
    </section>
</div>
