<script lang="ts">
    import { siteContent } from "./translations";
    import { type Locale, defaultLocale, currentLocale } from "$lib/locale/index.svelte";

    interface Props {
        locale : Locale
    }

    let { locale = defaultLocale} : Props = $props();
</script>

<h1>{siteContent[locale].about.title}</h1>
<h2>{currentLocale.locale}</h2>