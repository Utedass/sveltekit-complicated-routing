<script lang="ts">
    import { currentPath, getLocalizedLink } from "$lib/content/routing.svelte";
    import { currentLocale } from "$lib/locale/index.svelte";
    import { menuContent, headerMenusIndexes } from "../content/translations";
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
        <a href={getLocalizedLink(currentPath.path, "sv")}>Sv</a>
    </div>
    <div class="header-item">
        <a href={getLocalizedLink(currentPath.path, "en")}>En</a>
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
