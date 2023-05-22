<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let active: boolean;

    const dispatch = createEventDispatcher();

    function onClick(e: MouseEvent) {
        dispatch('click', { event: e });
    }
</script>

<button on:click={onClick} class:active>
    <div>
        <slot />
    </div>
</button>

<style>
    button {
        @apply h-12 flex-1;
        @apply bg-slate-900;
        @apply flex items-center justify-center;
    }

    button.active {
        @apply bg-slate-700;
    }

    div {
        @apply h-6 w-6;
        @apply text-white;
    }
</style>
