<script>
    import { siteContent, currentLocale } from "$lib/content/translations.svelte";
</script>

<h1>{siteContent[currentLocale.locale].knowledgeBank.title}</h1>
<h2>{currentLocale.locale}</h2>