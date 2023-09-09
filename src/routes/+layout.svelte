<script>
	import "../app.css";
	import Toast from '$lib/Toast.svelte'
</script>

<Toast/>

<main class="w-screen h-screen bg-primary-40 overflow-hidden">
	<div class="flex justify-center items-center w-full h-full">
		<slot />
	</div>
</main>

<style>
</style>