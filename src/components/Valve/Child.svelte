<script lang="ts">
    import { SvelteComponent } from 'svelte';
    export let icon: typeof SvelteComponent;
</script>

<button class="rounded-full bg-white p-2">
    <svelte:component this={icon} />
</button>
