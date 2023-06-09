<script lang="ts">
    import Drippy from '../../assets/drippy.svelte';

    export let active: boolean;
</script>

<button class:active on:click>
    <Drippy />
</button>

<style>
    button {
        --transition-duration: 0.5s;

        @apply block h-full w-full;
    }

    button :global(svg) {
        height: 100%;
        width: 100%;
    }

    :global(button.active #Gear) {
        transform: rotate(0deg);
        transition: transform var(--transition-duration) ease-in;
    }

    :global(button #Gear) {
        transform: rotate(90deg);
        transform-origin: center;
        transition: transform var(--transition-duration) ease-out;
    }
</style>
