<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Drippy from '../assets/drippy.svelte';

    export let active: boolean;

    const dispatch = createEventDispatcher();

    function onClick(e: MouseEvent) {
        active = !active;
        dispatch('click', e);
    }
</script>

<button class:active on:click={onClick}>
    <Drippy />
</button>

<style>
    button {
        --transition-duration: 0.5s;

        @apply block h-5 w-5;
    }

    :global(button.active #Gear) {
        transform: rotate(0deg);
        transition: transform var(--transition-duration) ease-in;
    }

    :global(button.active #Droplet) {
        opacity: 1;
        transform: translateY(0);
        transition: transform var(--transition-duration) ease-in,
            opacity var(--transition-duration) ease-in;
    }

    :global(button #Droplet) {
        opacity: 0;
        transform: translateY(-15%);
        transition: transform var(--transition-duration) ease-in,
            opacity var(--transition-duration) ease-out;
    }

    :global(button #Gear) {
        transform: rotate(90deg);
        transform-origin: center;
        transition: transform var(--transition-duration) ease-out;
    }
</style>
