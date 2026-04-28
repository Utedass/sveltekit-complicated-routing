<script lang="ts">
    import { menuContent, headerMenusIndexes } from "./translations";
</script>

Here is the header
<hr />
<div class="header">
    {#each headerMenusIndexes as menuIndex, index}
    <div>
        {index}
        {menuContent['sv'].headerMenus[menuIndex].text}
    </div>
    {/each}
</div>


<style>
    .header {
        flex: auto;
        flex-direction: column;
        gap: 10px;
    }
</style>
