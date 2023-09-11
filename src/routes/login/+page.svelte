<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { PUBLIC_ALLOW_SIGNUP } from "$env/static/public";
  import { pb } from "$lib/pocketbase";
  import { page } from "$app/stores";
  import { addToast } from "$lib/components/Toast.svelte";

  $: if ($page?.form?.error) {
    addToast({
      data: {
        title: 'Error',
        description: $page.form.error,
        color: 'bg-primary-50'
      }
    })
  }
</script>

<div class="flex items-center justify-center sm:p-20 p-10 bg-primary-20 rounded-xl">
  <form
    method="POST"
    use:enhance={() => {
			return async ({ result }) => {
				pb.authStore.loadFromCookie(document.cookie);
				await applyAction(result);
			};
		}}
  >
    <div class="flex flex-col gap-5 items-center justify-center">
      <h1 class="text-4xl font-black italic text-primary-40 place-self-start">Lockt</h1>
      <div class="flex flex-col items-start justify-center ">
        <input
          type="email"
          name="email"
          id="email"
          class="h-10 w-[240px] rounded-md px-3 py-2 text-primary-30 bg-primary-10 placeholder-primary-30"
          placeholder="Email"
        />
      </div>
      <div class="flex flex-col items-start justify-center">
        <input
          type="password"
          name="password"
          id="password"
          class="h-10 w-[240px] rounded-md px-3 py-2 text-primary-30 bg-primary-10 placeholder-primary-30"
          placeholder="password"
        />
      </div>
      <button
        class="w-full h-10 rounded-md bg-primary-50 px-3 py-1 font-medium text-primary-10 hover:opacity-75 active:opacity-50">
        Login
      </button>
      {#if PUBLIC_ALLOW_SIGNUP !== 'false'}
        <div class="flex gap-2 justify-center">
          <p>Don't have an account?</p>
          <a href="/signup" class="text-primary-50 font-medium">Sign Up</a>
        </div>
      {/if}
    </div>
  </form>
</div>
