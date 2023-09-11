<script lang="ts">
import AddBtn from "$lib/components/AddRecord.svelte";
import Toast from "$lib/components/Toast.svelte";
</script>

<Toast/>


<div class="w-full min-h-screen">
    <header class="sticky top-0 flex items-center justify-end bg-primary-40 px-10 py-5 opacity-90">
      <div class="flex items-center justify-between w-[50vw]">
        <h1 class="text-4xl font-black italic text-primary-10">Lockt</h1>
        <a href="/settings" class="text-primary-10">
          settings
        </a>
      </div>
    </header>
    <AddBtn/>
    <slot/>
</div>