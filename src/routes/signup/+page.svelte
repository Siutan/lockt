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

<div class="flex items-center justify-center sm:p-20 p-10 bg-primary-20 rounded-xl">
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
      <div class="flex flex-col items-start justify-center">
        <input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          class="h-10 w-[240px] rounded-md px-3 py-2 text-primary-30 bg-primary-10 placeholder-primary-30"
          placeholder="Confirm Password"
        />
      </div>
      <button
        class="w-full h-10 rounded-md bg-primary-50 px-3 py-1 font-medium text-primary-10 hover:opacity-75 active:opacity-50">
        Login
      </button>
        <div class="flex gap-2 justify-center">
          <p>Already have an account?</p>
          <a href="/login" class="text-primary-50 font-medium">
            {#if loading}
              Logging in...
            {:else}
              Login
            {/if}
          </a>
        </div>
    </div>
  </form>
</div>
