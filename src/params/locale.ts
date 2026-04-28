import type { ParamMatcher } from '@sveltejs/kit';
import { type Locale, locales } from '$lib/locale/index.svelte';


export const match = ((param: string): param is Locale => {
	return locales.includes(param as Locale);
}) satisfies ParamMatcher;
