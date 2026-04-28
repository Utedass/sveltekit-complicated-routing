<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import { type LayoutProps } from "./$types.js";
	import { pagesReverseLookup } from '$lib/content/routing.js';
    import Header from "$lib/content/Header.svelte";

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="debug">
	<!-- Debugging info -->
	<pre>
		{JSON.stringify(data, null, 2)}
		{JSON.stringify(pagesReverseLookup, null, 2)}
		
		Here comes the page la la la la
	</pre>
	<hr />
</div>

<Header />
{@render children()}

<style>
	.debug {
		display: none;
	}
</style>