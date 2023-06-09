<script lang="ts">
    import { fade } from 'svelte/transition';
    import Drippy from '../../assets/drippy.svelte';
    import Child from './Child.svelte';
    import type { ChildType } from './types.ts';
    import { assert } from '../../assert.ts';

    let active = false;

    export let actions: ChildType[];
    $: arc = 180 / (actions.length + 1);

    function getRotation(i: number) {
        return (i + 1) * arc - 90;
    }

    assert(Array.isArray(actions));
</script>

<div class="relative isolate z-50">
    {#each Object.entries(actions) as [i, { icon, action }]}
        <div
            class="child absolute inset-0 z-[-1] m-auto h-fit w-fit"
            style="--rotation: {getRotation(parseInt(i))}deg"
            class:active
        >
            <Child {icon} on:click={action} />
        </div>
    {/each}
    <button
        class="box-content h-14 w-14 rounded-full bg-white p-1.5"
        class:active
        on:click={() => (active = !active)}
    >
        <Drippy />
    </button>
</div>
{#if active}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        class="fixed inset-0 bg-black bg-opacity-70"
        transition:fade={{ duration: 150 }}
        on:click={() => (active = !active)}
    />
{/if}

<style>
    button {
        --transition-duration: 0.5s;
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
    .child.active {
        --distance: calc(-1 * theme(spacing.16));
        transform: rotate(var(--rotation)) translateY(var(--distance));
    }
    .child {
        /* transform: rotate(var(--rotation)) translateY(0); */
        transform: rotate(0) translateY(0);
        transform-origin: center;
        transition: transform 150ms linear;
    }

    .child > :global(*) {
        rotate: calc(-1 * var(--rotation));
    }
</style>
