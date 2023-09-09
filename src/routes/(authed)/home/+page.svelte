<script>
  import { applyAction, enhance } from "$app/forms";
  import { pb } from "$lib/pocketbase";
</script>
<h1>Home Page</h1>
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
  <button>Log out</button>
</form>