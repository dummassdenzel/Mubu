<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {});

  let name = "";
  let email = "";
  let phoneNumber = "";
  let address = "";
  let reason = "";
  let additionalInfo = "";
</script>

<section>
  <!-- HEADER -->
  <div class="relative">
    <img
      class="backdrop w-full h-[25vh] top-0 object-cover"
      src="assets/contact_us_bg.jpg"
      alt=""
    />
    <div class="absolute inset-0 flex items-center justify-center">
      <h1 class="text-white text-2xl md:text-4xl font-bold">Contact Us!</h1>
    </div>
  </div>

  <!-- CONTENT -->
  <form class="grid grid-cols-2 gap-x-16 max-sm:gap-x-5 p-16 max-sm:p-5">
    <!-- COLUMN 1 (Left) -->
    <div
      class="col-start-1 row-start-1 space-y-4 grid grid-rows-[auto_auto_auto_auto_auto_1fr]"
    >
      <div>
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          bind:value={name}
          required
          class="w-full p-1 border bg-accent border-slate-500"
        />
      </div>
      <div>
        <label for="email">E-mail:</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          required
          class="w-full p-1 border bg-accent border-slate-500"
        />
      </div>
      <div>
        <label for="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          bind:value={phoneNumber}
          required
          class="w-full p-1 border bg-accent border-slate-500"
        />
      </div>
      <div>
        <label for="address">Address:</label>
        <input
          type="text"
          id="address"
          bind:value={address}
          required
          class="w-full p-1 border bg-accent border-slate-500"
        />
      </div>
      <div>
        <label for="reason">Reason for Contact:</label>
        <input
          type="text"
          id="reason"
          bind:value={reason}
          required
          class="w-full p-1 border bg-accent border-slate-500"
        />
      </div>
    </div>

    <!-- COLUMN 2 (Right) -->
    <div class="col-start-2 row-start-1 flex flex-col">
      <label for="additionalInfo">Additional Information:</label>
      <textarea
        id="additionalInfo"
        bind:value={additionalInfo}
        class="w-full h-full p-1 border bg-accent border-slate-500 resize-none"
      ></textarea>
    </div>

    <div class="col-span-2 max-sm:flex-col flex justify-between mt-12">
      <p class="max-sm:text-center">
        or send us an email at: <b>cozycreatives@gmail.com</b>
      </p>
      <button
        type="submit"
        class="bg-hot py-2 px-16 text-white font-bold text-xl"
        >Submit
      </button>
    </div>
  </form>
</section>

<style>
  .backdrop {
    filter: blur(2.25px) grayscale(100%);
  }
</style>
