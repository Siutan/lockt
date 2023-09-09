import { fail, redirect } from "@sveltejs/kit";
import { pb } from '$lib/pocketbase'
import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";

export const load = (({ locals }) => {

  if (!pb.authStore.isValid) {
    throw redirect(303, '/login?origin=/home');
  } else {
    throw redirect(303, '/home');
  }
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as {
      email: string
      password: string
    }

    try {
      await pb
        .collection('users')
        .authWithPassword(data.email, data.password)
    } catch (_) {
      console.error(_)
      return fail(400, { error: 'Invalid Email or Password.', success: false, email: data.email })
    }

    throw redirect(303, '/home')
  },
}

