import { redirect } from "@sveltejs/kit";
import { pb } from "$lib/pocketbase";
import type { PageServerLoad } from "./$types";

export const load = (({ locals }) => {

  if (!pb.authStore.isValid) {
    throw redirect(303, '/login?origin=/');
  } else {
    throw redirect(303, '/home');
  }
}) satisfies PageServerLoad;
