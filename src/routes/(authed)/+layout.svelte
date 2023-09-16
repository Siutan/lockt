<script lang="ts">
import AddBtn from "$lib/components/AddRecord.svelte";
import Toast from "$lib/components/Toast.svelte";
import { page } from "$app/stores";
import { Settings, ArrowLeft } from "lucide-svelte";
</script>

<Toast/>


<div class="w-full min-h-screen">
    <header class="sticky top-0 flex items-center justify-end bg-mocha-mantle px-10 py-5 opacity-90">
      <div class="flex items-center justify-between w-[50vw]">
        <h1 class="text-4xl font-black italic text-mocha-sapphire">Lockt</h1>
        {#if $page.url.pathname === "/settings"}
          <a href="/home" class="bg-mocha-base border border-mocha-blue text-mocha-blue p-1 rounded-md hover:bg-mocha-blue/40 duration-500">
            <ArrowLeft/>
          </a>
        {:else}
          <a href="/settings" class="bg-mocha-base border border-mocha-blue text-mocha-blue p-1 rounded-md hover:bg-mocha-blue/40 duration-500">
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
