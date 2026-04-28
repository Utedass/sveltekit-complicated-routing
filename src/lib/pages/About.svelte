<script>
    import { siteContent } from "$lib/content/translations";
    import { currentLocale } from "$lib/locale/index.svelte";

</script>
<h1>{siteContent[currentLocale.locale].about.title}</h1>
<h2>{currentLocale.locale}</h2>
