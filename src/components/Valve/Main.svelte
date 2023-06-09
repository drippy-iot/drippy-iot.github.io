<script lang="ts">
    import { fade } from 'svelte/transition';
    import Drippy from '../../assets/drippy.svelte';

    let active = false;
</script>

<div class="relative z-50 box-content h-14 w-14 rounded-full bg-white p-1.5">
    <button class:active on:click={() => (active = !active)}>
        <Drippy />
    </button>
</div>
{#if active}
    <div
        class="fixed inset-0 bg-black bg-opacity-70"
        transition:fade={{ duration: 150 }}
    />
{/if}

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
