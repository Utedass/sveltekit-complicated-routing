import { getLocaleAndPathFromPathname, pagesReverseLookup, symlinks } from "$lib/content/routing.svelte";
import type { Reroute } from "@sveltejs/kit";

export const reroute: Reroute = (event) => {
    //console.log("Reroute: ", JSON.stringify(event, null, 2));
    const { locale, path } = getLocaleAndPathFromPathname(event.url.pathname);
    //console.log(`Locale: ${locale}, pathname: ${path}`);
    
    if (path in pagesReverseLookup)
    {
        const canonicalPath = '/' + locale + pagesReverseLookup[path].path;
        //console.log("Path found in reverse lookup: ", pagesReverseLookup[path].path, "\nRerouting to: ", canonicalPath);
        return canonicalPath;
    }
    
    if (event.url.pathname in symlinks)
    {
        return symlinks[event.url.pathname];
    }

    return event.url.pathname;
};
