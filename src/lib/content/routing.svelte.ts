import { currentLocale, defaultLocale, isLocale, type Locale, locales } from "$lib/content/translations.svelte";
import { pushState } from "$app/navigation";

interface Page {
    routes: Record<Locale, string>
    path: string
}

export const currentPath = $state({ path: '/' })

// Map all pages and their locales page paths
export const pages = {
    startPage: {
        routes: {
            en: '/',
            sv: '/'
        },
        path: "/"
    },
    knowledgeBank: {
        routes: {
            en: '/knowledge-bank',
            sv: '/kunskapsbank'
        },
        path: "/knowledge-bank"
    },
    about: {
        routes: {
            en: '/about',
            sv: '/om'
        },
        path: "/about"
    },
    contact: {
        routes: {
            en: '/contact',
            sv: '/kontakt'
        },
        path: "/contact"
    }
} satisfies Record<string, Page>;

// Symlinks because why not?
export const symlinks = {
    "/hemlis": "/din.mamma"
} satisfies Record<string, string>

// Create reverse-lookup from page-path -> page-object
export const pagesReverseLookup = Object.values(pages).reduce((acc, page) => {
    for (const locale of locales) {
        acc[page.routes[locale]] = page;
    }
    return acc;
}, {} as Record<string, Page>);


export function getLocalizedLink(pathname: string, inLocale: Locale = currentLocale.locale): string {
    let localizedPath;

    // Translate the path if it is registered
    if (pathname in pagesReverseLookup) {
        localizedPath = (inLocale == defaultLocale ? '' : `/${inLocale}`) + pagesReverseLookup[pathname].routes[inLocale];
        // Remove trailing slashes if any, except the last one
        localizedPath = localizedPath.replace(/\/+$/, '') || '/';
    }
    else {
        // Path not found, but return the same path in the desired locale
        localizedPath = (inLocale == defaultLocale ? '' : `/${inLocale}`) + pathname;
        localizedPath = localizedPath.replace(/\/+$/, '');
    }

    return localizedPath;
}


/***
 * Returns locale as two letters
 * and path with leading / but no trailing /
 */
export function getLocaleAndPathFromPathname(pathname: string): { locale: Locale, path: string } {
    let locale: Locale;

    // Split url pathname into tokens separated by /, discard any empty gorups
    const parts = pathname.split('/').filter(Boolean);
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

    // Reconstruct the path back into a valid pathname starting with a /
    const path = '/' + pageParts.join('/');

    return { locale, path };
}

export function changeLocale(locale: Locale)
{
        currentLocale.locale = locale;
        console.log("Resolving to: ", getLocalizedLink(currentPath.path))
        pushState(getLocalizedLink(currentPath.path));
}
