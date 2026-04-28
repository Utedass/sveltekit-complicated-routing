import type { LayoutLoad } from './$types';
import { type Locale, defaultLocale, isLocale, currentLocale } from '$lib/locale/index.svelte';
import { currentPath, pagesReverseLookup } from '$lib/content/routing.svelte'
import { redirect } from '@sveltejs/kit';

export const load: LayoutLoad = (event) => {

	// Split url pathname into tokens separated by /, discard any empty gorups
	const parts = event.url.pathname.split('/').filter(Boolean);

	let locale: Locale;
	let pageParts: string[];

	// If the list is not empty, and the first element matches a locale.
	if (parts.length > 0 && isLocale(parts[0])) {
		// Then we found the locale part and the rest is the page-path
		locale = parts[0];
		pageParts = parts.slice(1);
	} else {
		// Otherwise, fallback to default locale and consider the whole pathname as page-path
		locale = defaultLocale;
		pageParts = parts;
	}

	currentLocale.locale = locale;

	// Reconstruct the path back into a valid pathname starting with a /
	currentPath.path = '/' + pageParts.join('/');

	let correctPage;
	let isCorrectPage = false;

	console.log(currentPath.path);

	// If the page path is registered
	if (currentPath.path in pagesReverseLookup) {
		// Recreate the correct pathname based on the selected locale
		correctPage = (locale == defaultLocale ? '' : `/${locale}`) + pagesReverseLookup[currentPath.path].routes[locale];
		// Remove trailing slashes if any, except the last one
		correctPage = correctPage.replace(/\/+$/, '') || '/';
		isCorrectPage = event.url.pathname === correctPage;

		// If not on the correct pathname, redirect user
		if (!isCorrectPage) {
			console.log(`Redirecting from ${event.url.pathname} to ${correctPage}`);
			redirect(308, correctPage);
		}

	}
	else {
		correctPage = "404"; // Will be handled by default sveltekit behaviour
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
