<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Permutations from '$lib/Permutations.svelte';
</script>

<svelte:head>
	<title>Permutations</title>
</svelte:head>

<Header />

<main>
	<Permutations />
</main>

<footer>
	<small>
	Created by
	<a href="https://github.com/JanMalch" rel="noopener">JanMalch</a>
	&middot;
		Logo by <a href="https://fonts.google.com/icons?selected=Material+Icons&icon.query=clear+all" rel="noopener">Material Icons</a>
	&middot;
	<a href="https://github.com/JanMalch/permutations" rel="noopener">Source Code</a>
	&middot;
	&copy; JanMalch, {new Date().getFullYear()}
	</small>
</footer>


<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		text-align: center;
		padding: 64px;
	}



</style>
