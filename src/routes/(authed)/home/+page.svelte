<script>
  import SecretItem from "$lib/components/SecretItem.svelte";
  export let data;
</script>

{#if data.records.length === 0}
  <div class="flex items-center justify-center w-full h-screen text-primary-10 p-10">
    <div class="flex flex-col items-center justify-center h-full">
      <h1 class="text-3xl font-bold text-mocha-lavender">No records found</h1>
      <p class="text-mocha-pink font-semibold">Click on the + icon on the bottom right to add a new record</p>
    </div>
  </div>
{:else}
  <div class="flex justify-center">
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 grid-flow-row auto-rows-max gap-5 px-5 xl:px-16 py-8">
      {#each data.records as record}
        <SecretItem {...record} />
      {/each}
    </div>
  </div>
{/if}
