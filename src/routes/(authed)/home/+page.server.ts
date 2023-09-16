import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { encrypt } from "$lib/crypt";

export const load = (async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login?origin=/home');
	}

	const records = await locals.pb.collection('content').getFullList({
		sort: '-created'
	});

	return {
		records
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	addSecret: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData()) as {
			type: string;
			source: string;
			identity: string;
			secret: string;
		};

		const user = locals.pb.authStore.model;

		if (!user) {
			return fail(401, { message: 'Unauthorized' });
		}

		const sendData = {
			user: user?.id,
			type: data.type,
			source: data.source,
			identity: data.identity,
			secret: await encrypt(data.secret)
		};

		try {
			await locals.pb.collection('content').create(sendData);
			return { message: 'success' };
		} catch (e: unknown) {
			console.log(e);
			return fail(400, { error: 'Invalid Parameters.', success: false });
		}
	},
	editSecret: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData()) as {
			recordId: string;
			type: string;
			source: string;
			identity: string;
			secret: string;
		};

		const user = locals.pb.authStore.model;

		if (!user) {
			return fail(401, { message: 'Unauthorized' });
		}

		const sendData = {
			user: user?.id,
			type: data.type,
			source: data.source,
			identity: data.identity,
			secret: await encrypt(data.secret)
		};

		try {
			await locals.pb.collection('content').update(data.recordId, sendData);
			return { message: 'success' };
		} catch (e: unknown) {
			console.log(e);
			return fail(400, { error: 'Invalid Parameters.', success: false });
		}
	},
	deleteSecret: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData()) as {
			recordId: string;
		};

		const user = locals.pb.authStore.model;

		if (!user) {
			return fail(401, { message: 'Unauthorized' });
		}

		try {
			await locals.pb.collection('content').delete(data.recordId);
			return { message: 'success' };
		} catch (e: unknown) {
			console.log(e);
			return fail(400, { error: 'Invalid Parameters.', success: false });
		}
	}
};
