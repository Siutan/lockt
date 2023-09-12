import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, '/login?origin=/settings');
  }
}) satisfies PageServerLoad;