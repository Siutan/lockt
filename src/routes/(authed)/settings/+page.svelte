<script>
import { applyAction } from "$app/forms";
import { enhance } from "$app/forms";
import { pb } from "$lib/pocketbase";
</script>

<div class="flex flex-col gap-10 items-center justify-center">
  <div class="w-96 flex flex-col gap-5 p-5 bg-primary-20 rounded-lg">
    <h1 class="text-4xl font-black italic text-primary-10">Account</h1>
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
      <button class="w-full p-2 bg-primary-30 rounded-lg text-primary-10 text-xl font-semibold hover:bg-primary-40"
      >Logout</button>
    </form>

    <button class="w-full p-2 bg-primary-30 rounded-lg text-primary-10 text-xl font-semibold hover:bg-primary-40"
    >Change Email</button>
    <button class="w-full p-2 bg-primary-30 rounded-lg text-primary-10 text-xl font-semibold hover:bg-primary-40"
    >Change Password</button>
    <button class="w-full p-2 bg-primary-50 rounded-lg text-primary-10 text-xl font-semibold hover:bg-rose-800/80"
    >Delete Account</button>
  </div>
  <div>

  </div>
</div>