<script>
	import "../app.css";
	import { onNavigate } from '$app/navigation';
	import Toast from '$lib/components/Toast.svelte'

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<Toast/>

<main class="flex justify-center items-center min-h-screen bg-mocha-crust">
	<slot />
</main>
