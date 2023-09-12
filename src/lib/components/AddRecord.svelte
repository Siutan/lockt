<script lang="ts">
  import { enhance } from "$app/forms";
  import { createDialog, melt } from "@melt-ui/svelte";
  import { fade, fly } from "svelte/transition";
  import { X, Plus } from "lucide-svelte";
  import { page } from "$app/stores";

  const {
    elements: {
      trigger,
      overlay,
      content,
      close,
      portalled
    },
    states: { open }
  } = createDialog();
</script>
<div use:melt={$portalled}>
  {#if $open}
    <div
      use:melt={$overlay}
      class="fixed inset-0 z-50 bg-black/50"
      transition:fade={{ duration: 150 }}>
    </div>
    <div
      use:melt={$content}
      class="fixed left-0 top-0 z-50 h-screen w-full max-w-[350px] bg-mocha-crust p-6
            shadow-lg focus:outline-none"
      transition:fly={{
        x: -350,
        duration: 350,
        opacity: 1,
      }}
    >
      <button
        use:melt={$close}
        aria-label="Close"
        class="absolute right-[10px] top-[10px] inline-flex h-6 w-6
                appearance-none items-center justify-center rounded-full text-mocha-base focus:outline-none"
      >
        <X class="square-4" />
      </button>
      <section>
        <h1 class="mb-0 font-black text-4xl italic text-mocha-blue">
          New
        </h1>
        <p class="mb-5 mt-2 leading-normal text-mocha-lavender">
          Add a new secret.
        </p>
        <form class="rounded-md px-4 max-h-full text-mocha-blue" method="POST" action="?/addSecret" use:enhance>
          <div class="mt-6 flex flex-col h-full justify-between gap-4">
            <div class="flex flex-col items-start justify-center">
              <select
                name="type"
                id="type"
                class="h-10 w-full rounded-md px-3 py-2 text-mocha-base bg-mocha-lavender placeholder-mocha-base outline-mocha-mantle font-bold"
              >
                <option disabled selected class="disabled:text-primary-40">Type</option>
                <option value="website">Website</option>
                <option value="account">Account</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="flex flex-col items-start justify-center">
              <input
                type="text"
                name="source"
                id="source"
                class="h-10 w-full rounded-md px-3 py-2 text-mocha-blue bg-mocha-base placeholder-mocha-blue outline-mocha-mantle"
                placeholder="Account/Website"
              />
            </div>
            <div class="flex flex-col items-start justify-center">
              <input
                type="text"
                name="identity"
                id="identity"
                class="h-10 w-full rounded-md px-3 py-2 text-mocha-blue bg-mocha-base placeholder-mocha-blue outline-mocha-mantle"
                placeholder="Username/Email"
              />
            </div>
            <div class="flex flex-col items-start justify-center">
              <input
                type="password"
                name="secret"
                id="secret"
                class="h-10 w-full rounded-md px-3 py-2 text-mocha-blue bg-mocha-base placeholder-mocha-blue outline-mocha-mantle"
                placeholder="Password"
              />
            </div>
            <div class="flex justify-center gap-5">
              <button
                use:melt={$close}
                class="inline-flex h-8 items-center justify-center
                            rounded-[4px] bg-mocha-maroon px-4 font-medium leading-none
                            text-mocha-base focus:outline-none focus:ring-2
                            focus:ring-magnum-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="inline-flex h-8 items-center justify-center
                            rounded-lg  px-4 font-medium leading-none
                            text-mocha-sapphire focus:outline-none focus:ring-2
                            focus:ring-primary-40"
              >
                Create
              </button>
            </div>
          </div>
        </form>
        {#if $page?.form?.error}
          <div class="w-full p-5 my-5 bg-mocha-maroon rounded-lg">
            <p class="flex flex-col text-mocha-base">
              <span class="font-bold">Error:</span> {$page.form.error}
              <span class="font-bold">Please try again.</span>
            </p>
          </div>
        {:else if $page?.form?.message === "success"}
          <div class="w-full p-5 my-5 bg-mocha-sapphire/70 rounded-lg">
            <p class="flex flex-col text-mocha-base">
              <span class="font-bold">Success:</span> Secret Added!
            </p>
          </div>
        {/if}
      </section>
    </div>
  {/if}
</div>


<button
  class="fixed bottom-10 right-10 flex items-center justify-center w-14 h-14 border border-mocha-blue rounded-xl hover:bg-mocha-blue/40 duration-500"
  use:melt={$trigger}>
  <Plus class="square-6 text-mocha-blue" />
</button>