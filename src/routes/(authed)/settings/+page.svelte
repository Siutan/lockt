<script>
import { applyAction } from "$app/forms";
import { enhance } from "$app/forms";
import { pb } from "$lib/pocketbase";
</script>

<div class="flex flex-col gap-10 items-center justify-center p-10">
  <div class="w-96 flex flex-col gap-5 p-5 bg-mocha-base rounded-lg">
    <h1 class="text-4xl font-black italic text-mocha-lavender">Account</h1>
    <form
      method="POST"
      action="/logout"
      use:enhance={() => {
                return async ({ result }) => {
                  pb.authStore.clear()
                  await applyAction(result)
                }
              }}
    >
      <button class="w-full p-2 bg-mocha-blue rounded-lg text-mocha-base text-xl font-semibold hover:bg-mocha-blue/60"
      >Logout</button>
    </form>

    <button class="w-full p-2 bg-mocha-blue rounded-lg text-mocha-base text-xl font-semibold hover:bg-mocha-blue/60"
    >Change Email</button>
    <button class="w-full p-2 bg-mocha-blue rounded-lg text-mocha-base text-xl font-semibold hover:bg-mocha-blue/60"
    >Change Password</button>
    <button class="w-full p-2 bg-mocha-maroon rounded-lg text-mocha-base text-xl font-semibold hover:bg-rose-800/80"
    >Delete Account</button>
  </div>
  <div>

  </div>
</div>