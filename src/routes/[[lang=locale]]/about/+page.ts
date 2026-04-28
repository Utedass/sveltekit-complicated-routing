import type { PageLoad } from './$types';
import { defaultLocale } from '$lib/locale/index.svelte';

export const load: PageLoad = (event) => {
	const locale = event.params.lang ?? defaultLocale;
	
	let page = event.url.pathname;

	if (event.params.lang && page.startsWith(`/${event.params.lang}`)) {
		page = page.slice(event.params.lang.length + 1) || '/';
	}
	
	return {
		locale,
		page
	};
};
