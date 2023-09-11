<script lang="ts">
  export let type: string;

  export let source: string;
  export let identity: string;
  export let secret: string;

  import { addToast } from "$lib/components/Toast.svelte";

  import { createPopover, melt } from "@melt-ui/svelte";
  import { fade } from "svelte/transition";
  import { X } from "lucide-svelte";

  const {
    elements: { trigger, content, arrow, close },
    states: { open }
  } = createPopover({
    forceVisible: true
  });

  // use clipboard api to copy secret
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(secret);
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

<button class="w-[400px] px-2 py-3 rounded-lg bg-primary-20 hover:bg-primary-20/80 cursor-pointer" on:click={copy}>
  <span class="flex flex-col">
    <span class="flex items-center justify-start gap-5 ">
    <span class="px-3 py-1 max-w-32 rounded-lg bg-primary-30 text-primary-10 capitalize">
      {type}
    </span>
      <span class="text-xl font-bold text-primary-30 {type !== 'website' ? 'capitalize' : ''}">{source}</span>
    </span>
    <span class="flex justify-between pr-2">
      <span class="text-2xl text-primary-10 truncate">{identity}</span>
      <span>
        <button
          type="button"
          class="trigger"
          on:click|stopPropagation
          use:melt={$trigger}
          aria-label="Update Secret"
        >
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
      <p>Actions</p>
      <button>
        <span class="text-primary-10">Copy</span>
      </button>
      <button>
        <span class="text-primary-10">Edit</span>
      </button>
      <button>
        <span class="text-primary-10">Delete</span>
      </button>
    </div>
    <button class="close" use:melt={$close}>
      <X class="square-4" />
    </button>
  </div>
{/if}

<style lang="postcss">
    fieldset {
        @apply flex items-center gap-5;
    }

    label {
        @apply w-[75px] text-sm text-primary-10;
    }

    p {
        @apply mb-2 font-medium text-primary-40;
    }

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