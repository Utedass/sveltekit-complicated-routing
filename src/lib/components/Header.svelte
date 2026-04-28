<script lang="ts">
    import { currentPath, getLocalizedLink } from "$lib/content/routing.svelte";
    import {
        menuContent,
        headerMenusIndexes,
        currentLocale
    } from "../content/translations.svelte";
    import { pushState, goto, replaceState } from '$app/navigation'

    function cycleLanguage() {
        if (currentLocale.locale === "sv") currentLocale.locale = "en";
        else currentLocale.locale = "sv";
        console.log("Resolving to: ", getLocalizedLink(currentPath.path))
        pushState(getLocalizedLink(currentPath.path), {dummy: true});
    }
</script>

<div class="header">
    {#each headerMenusIndexes as menuIndex, index}
        <div class="header-item">
            <a
                href={getLocalizedLink(
                    menuContent[currentLocale.locale].headerMenus[menuIndex]
                        .path,
                )}>
                {menuContent[currentLocale.locale].headerMenus[menuIndex].text}
            </a>
        </div>
    {/each}
    <div class="header-item">
        <a href={getLocalizedLink("/page-that-doesnt-exist")}>
            Page that doesn't exist
        </a>
    </div>
    <div class="header-item">
        <button onclick={cycleLanguage}>Switch!</button>
    </div>
</div>
<hr />

<style>
    .header {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
    .header-item {
        flex: auto;
        justify-content: space-between;
    }
</style>
