<script>
  import SecretItem from "$lib/components/SecretItem.svelte";
  export let data;
</script>

{#if data.records.length === 0}
  <div class="flex items-center justify-center w-full h-screen text-primary-10 p-10">
    <div class="flex flex-col items-center justify-center h-full">
      <h1 class="text-3xl font-bold text-primary-500">No records found</h1>
      <p class="text-primary-500">Click on the + icon on the bottom right to add a new record</p>
    </div>
  </div>
{:else}
  <div class="grid grid-cols-1 sm:grid-cols-4 grid-flow-row auto-rows-max gap-5 px-5 sm:px-16 py-8">
    {#each data.records as record}
      <SecretItem {...record} />
    {/each}
  </div>
{/if}
