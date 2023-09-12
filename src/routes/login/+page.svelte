<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { PUBLIC_ALLOW_SIGNUP } from "$env/static/public";
  import { pb } from "$lib/pocketbase";
  import { page } from "$app/stores";
  import { addToast } from "$lib/components/Toast.svelte";

  let loading = false;

  $: if ($page?.form?.error) {
    loading = false;
    addToast({
      data: {
        title: 'Error',
        description: $page.form.error,
        color: 'bg-primary-50'
      }
    })
  }
</script>

<div class="flex items-center justify-center sm:p-20 p-10 bg-mocha-mantle rounded-xl">
  <form
    method="POST"
    use:enhance={() => {
			return async ({ result }) => {
        loading = true;
				pb.authStore.loadFromCookie(document.cookie);
				await applyAction(result);
			};
		}}
  >
    <div class="flex flex-col gap-5 items-center justify-center">
      <h1 class="text-4xl font-black italic text-mocha-blue place-self-start">Lockt</h1>
      <div class="flex flex-col items-start justify-center ">
        <input
          type="email"
          name="email"
          id="email"
          class="h-10 w-[240px] rounded-md px-3 py-2 text-mocha-blue bg-mocha-base placeholder-mocha-blue"
          placeholder="Email"
        />
      </div>
      <div class="flex flex-col items-start justify-center">
        <input
          type="password"
          name="password"
          id="password"
          class="h-10 w-[240px] rounded-md px-3 py-2 text-mocha-blue bg-mocha-base placeholder-mocha-blue"
          placeholder="password"
        />
      </div>
      <button
        class="w-full h-10 rounded-md bg-mocha-sapphire px-3 py-1 font-medium text-mocha-base hover:opacity-75 active:opacity-50">
        {#if loading}
          Logging in...
        {:else}
          Login
        {/if}
      </button>
      {#if PUBLIC_ALLOW_SIGNUP !== 'false'}
        <div class="flex gap-2 justify-center text-mocha-blue">
          <p>Don't have an account?</p>
          <a href="/signup" class="text-mocha-lavender font-medium">Sign Up</a>
        </div>
      {/if}
    </div>
  </form>
</div>
