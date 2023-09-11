import { fail, redirect } from "@sveltejs/kit";
import { PUBLIC_ALLOW_SIGNUP } from "$env/static/public";
import type { PageServerLoad, Actions } from "./$types";

export const load = (({ locals }) => {
  if (locals.pb.authStore.isValid) {
    throw redirect(303, '/home');
  }
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as {
      email: string
      password: string
      passwordConfirm: string
    };

    if (PUBLIC_ALLOW_SIGNUP !== "true") {
      throw redirect(303, "/login");
    }

    try {
      await locals.pb.collection("users").create(data);
      await locals.pb
        .collection("users")
        .authWithPassword(data.email, data.password);
    } catch (e: any) {
      console.error(e);
      return fail(400, { error: e.message, success: false, email: data.email })
    }

    throw redirect(303, "/");
  }
};
