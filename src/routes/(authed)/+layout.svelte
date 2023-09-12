<script lang="ts">
import AddBtn from "$lib/components/AddRecord.svelte";
import Toast from "$lib/components/Toast.svelte";
import { page } from "$app/stores";
import { Settings, ArrowLeft } from "lucide-svelte";
</script>

<Toast/>


<div class="w-full min-h-screen">
    <header class="sticky top-0 flex items-center justify-end bg-primary-40 px-10 py-5 opacity-90">
      <div class="flex items-center justify-between w-[50vw]">
        <h1 class="text-4xl font-black italic text-primary-10">Lockt</h1>
        {#if $page.url.pathname === "/settings"}
          <a href="/home" class="bg-primary-30 text-primary-10 p-1 rounded-md">
            <ArrowLeft/>
          </a>
        {:else}
          <a href="/settings" class="bg-primary-30 text-primary-10 p-1 rounded-md">
            <Settings/>
          </a>
        {/if}

      </div>
    </header>
  <slot/>
  {#if $page.url.pathname !== "/settings"}
    <AddBtn/>
  {/if}
</div>
