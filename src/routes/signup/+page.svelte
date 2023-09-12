<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
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
    class="card"
    use:enhance={() => {
        loading = true;
			return async ({ result }) => {
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
      <div class="flex flex-col items-start justify-center">
        <input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          class="h-10 w-[240px] rounded-md px-3 py-2 text-mocha-blue bg-mocha-base placeholder-mocha-blue"
          placeholder="Confirm Password"
        />
      </div>
      <button
        class="w-full h-10 rounded-md bg-mocha-sapphire px-3 py-1 font-medium text-mocha-base hover:opacity-75 active:opacity-50">
        {#if loading}
          Signing Up...
        {:else}
          Sign Up
        {/if}
      </button>
        <div class="flex gap-2 justify-center text-mocha-blue">
          <p>Already have an account?</p>
          <a href="/login" class="text-mocha-lavender font-medium">
            Login
          </a>
        </div>
    </div>
  </form>
</div>
