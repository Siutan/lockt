<script lang="ts">
  import { addToast } from "$lib/components/Toast.svelte";
  import { enhance } from "$app/forms";
  import { createPopover, melt } from "@melt-ui/svelte";
  import { fade } from "svelte/transition";
  import { X, Settings2 } from "lucide-svelte";
  import { decrypt } from "$lib/crypto";

  export let id: string;
  export let type: string;
  export let source: string;
  export let identity: string;
  export let secret: string;


  const {
    elements: { trigger, content, arrow, close },
    states: { open }
  } = createPopover({
    forceVisible: true
  });

  // use clipboard api to copy secret
  const copy = async () => {
    try {
      // decrypt secret
      await navigator.clipboard.writeText(await decrypt(secret));
      addToast({
        data: {
          title: "Success",
          description: "Copied to clipboard",
          color: "bg-green-800/20"
        }
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
</script>

<button class=" max-w-[400px] px-2 py-3 rounded-lg bg-primary-20 hover:bg-primary-20/80 cursor-pointer" on:click={copy}>
  <span class="flex flex-col">
    <span class="flex items-center justify-start gap-5">
    <span class="px-3 py-1 max-w-32 rounded-lg bg-primary-30 text-primary-10 font-semibold capitalize">
      {type}
    </span>
      <span class="text-xl font-bold text-primary-40 {type !== 'website' ? 'capitalize' : ''}">{source}</span>
    </span>
    <span class="flex justify-between pr-2">
      <span class="text-2xl font-semibold text-primary-10 truncate">{identity}</span>
      <span>
        <button
          type="button"
          class="trigger"
          on:click|stopPropagation
          use:melt={$trigger}
          aria-label="Update Secret"
        >
          <Settings2 class="text-primary-10" />
          <span class="sr-only">Open Actions</span>
        </button>
      </span>
    </span>
  </span>
</button>

{#if $open}
  <div use:melt={$content} transition:fade={{ duration: 100 }} class="content">
    <div use:melt={$arrow}></div>
    <div class="flex flex-col gap-2.5">
      <form class="rounded-md px-4 max-h-full text-primary-10" method="POST"
            action="?/editSecret" use:enhance>
        <div class="mt-6 flex flex-col h-full justify-between gap-4">
          <div class="flex gap-1">
            <p class="text-sm font-medium text-primary-40 italic ">ID: {id}</p>
            <input
              hidden
              type="text"
              name="recordId"
              id="recordId"
              value={id}/>
          </div>
          <div class="flex flex-col items-start justify-center">
            <select
              name="type"
              id="type"
              class="h-10 w-full rounded-md px-3 py-2 text-primary-40 bg-primary-10 placeholder-primary-30 outline-primary-30 font-bold"
              value={type}
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
              class="h-10 w-full rounded-md px-3 py-2 text-primary-30 bg-primary-10 placeholder-primary-30 outline-primary-30"
              placeholder="Account/Website"
              value="{source}"
            />
          </div>
          <div class="flex flex-col items-start justify-center">
            <input
              type="text"
              name="identity"
              id="identity"
              class="h-10 w-full rounded-md px-3 py-2 text-primary-30 bg-primary-10 placeholder-primary-30 outline-primary-30"
              placeholder="Username/Email"
              value="{identity}"
            />
          </div>
          <div class="flex flex-col items-start justify-center">
            <input
              type="password"
              name="secret"
              id="secret"
              class="h-10 w-full rounded-md px-3 py-2 text-primary-30 bg-primary-10 placeholder-primary-30 outline-primary-30"
              placeholder="Password"
              value="{secret}"
            />
          </div>
          <div class="flex justify-center gap-5">
            <button
              formaction="?/deleteSecret"
              class="inline-flex h-8 items-center justify-center
                            rounded-lg bg-primary-50 px-4 font-medium leading-none
                            text-primary-10 focus:outline-none hover:bg-rose-900/90"
            >
              Delete
            </button>
            <button
              type="submit"
              class="inline-flex h-8 items-center justify-center
                            rounded-lg px-4 font-medium leading-none
                            text-primary-10 focus:outline-none hover:bg-primary-40/70"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
    <button class="close" use:melt={$close}>
      <X class="square-4" />
    </button>
  </div>
{/if}

<style lang="postcss">
    .trigger {
        @apply inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-30 p-0;
        @apply text-sm font-medium text-primary-10 transition-colors hover:bg-primary-40/90;
        @apply focus-visible:ring focus-visible:ring-primary-40 focus-visible:ring-offset-2;
    }

    .close {
        @apply absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full;
        @apply text-primary-40 transition-colors hover:bg-primary-50/10;
        @apply focus-visible:ring focus-visible:ring-primary-40 focus-visible:ring-offset-2;
        @apply p-0 text-sm font-medium;
    }

    .content {
        @apply z-10 w-60 rounded-lg bg-primary-30 p-5 shadow-sm;
    }
</style>