<script lang="ts">
    import About from '$lib/content/About.svelte';
    import type { PageProps } from './$types';

    let { data } : PageProps = $props();
</script>

This is about as good as it gets
<pre>
{JSON.stringify(data, null, 2)}
</pre>


<About locale={data.locale} />
