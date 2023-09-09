import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import { pb } from "$lib/pocketbase";

export const actions: Actions = {
  default: async ({ locals }) => {
    pb.authStore.clear()
    throw redirect(303, '/')
  },
}
