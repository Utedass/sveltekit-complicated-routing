<script lang="ts">
	import { page } from '$app/state';
    import { currentPath } from '$lib/content/routing.svelte';
    import { siteContent } from '$lib/content/translations';
    import { currentLocale } from "$lib/locale/index.svelte";

</script>

<h1>{page.error.status}</h1>
{siteContent[currentLocale.locale].error[page.status]} {currentPath.path}