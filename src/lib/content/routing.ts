import { type Locale, locales } from "$lib/locale/index.svelte";

interface Page {
    routes: Record<Locale, string>
}

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
