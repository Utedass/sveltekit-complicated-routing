import type { LayoutLoad } from './$types';
import { defaultLocale } from '$lib/locale/index.svelte';
import { currentPath, getLocaleAndPathFromPathname, getLocalizedLink, pagesReverseLookup } from '$lib/content/routing.svelte'
import { redirect } from '@sveltejs/kit';
import { currentLocale } from '$lib/locale/index.svelte';

export const load: LayoutLoad = (event) => {

	const {locale, path } = getLocaleAndPathFromPathname(event.url.pathname);
	currentLocale.locale = locale;
	currentPath.path = path;

	const correctPage = getLocalizedLink(currentPath.path);
	const isCorrectPage = correctPage === event.url.pathname;

	console.log("Layout.ts current path: ", currentPath.path);


	// If not on the correct pathname, redirect user
	if (!isCorrectPage) {
		console.log(`Redirecting from ${event.url.pathname} to ${correctPage}`);
		redirect(308, correctPage);
	}


	// These return values are only for debugging
	return {
		paramLang: event.params.lang,
		locale,
		page: currentPath.path,
		correctPage,
		isCorrectPage
	};
};
