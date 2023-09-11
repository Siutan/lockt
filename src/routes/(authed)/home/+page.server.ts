import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type Record from 'pocketbase';

export const load = (async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login?origin=/home');
	}

	// Get all content from the database
	const records = await locals.pb.collection('content').getFullList({
		sort: '-created'
	});

	return {
		// This is done because pocketbase doesn't return a plain object.
		records: JSON.parse(JSON.stringify(records)) as Record[]
	};
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
			secret: data.secret
		};

		try {
			await locals.pb.collection('content').create(sendData);
			return {message: 'success'};
		} catch (e: unknown) {
			console.log(e);
			return fail(400, { error: 'Invalid Parameters.', success: false } );
		}
	}
};

