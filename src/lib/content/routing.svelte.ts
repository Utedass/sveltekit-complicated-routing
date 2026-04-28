import { currentLocale, defaultLocale, type Locale, locales } from "$lib/locale/index.svelte";
import { error } from "@sveltejs/kit";

interface Page {
    routes: Record<Locale, string>
}

export const currentPath = $state({ path: '/' })

// Map all pages and their locales page paths
export const pages = {
    startPage: {
        routes: {
            en: '/',
            sv: '/'
        }
    },
    knowledgeBank: {
        routes: {
            en: '/knowledge-bank',
            sv: '/kunskapsbank'
        }
    },
    about: {
        routes: {
            en: '/about',
            sv: '/om'
        }
    },
    contact: {
        routes: {
            en: '/contact',
            sv: '/kontakt'
        }
    }
} satisfies Record<string, Page>;

// Create reverse-lookup from page-path -> page-object
export const pagesReverseLookup = Object.values(pages).reduce((acc, page) => {
    for (const locale of locales) {
        acc[page.routes[locale]] = page;
    }
    return acc;
}, {} as Record<string, Page>);


export function getLocalizedLink(path: string, inLocale: Locale = currentLocale.locale): string {
    let correctPage = "page-not-found";

    if (path in pagesReverseLookup) {
        correctPage = (inLocale == defaultLocale ? '' : `/${inLocale}`) + pagesReverseLookup[path].routes[inLocale];
        // Remove trailing slashes if any, except the last one
        correctPage = correctPage.replace(/\/+$/, '') || '/';
    }
    else {
        //throw(error(404, "Page not found"));
        // Page not found, but return the same path in the desired locale
        correctPage = (inLocale == defaultLocale ? '' : `/${inLocale}`) + path;
        correctPage = correctPage.replace(/\/+$/, '') || '/';
    }

    return correctPage;
}
