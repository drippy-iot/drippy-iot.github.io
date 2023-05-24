<script lang="ts">
    import Options from './Options.svelte';
    import type { Option } from './types.ts';

    export let name: HTMLInputElement['name'];
    export let value: Option;
    export let options: Option[];
    export let disabled: boolean | undefined;

    let open = false;

    function toggle() {
        open = !open;
    }
</script>

<span>
    <button on:click={toggle} {disabled}>
        <label for={name}><slot /></label>
        <input
            type="text"
            {name}
            size={value.toString().length}
            readonly
            bind:value
        />
    </button>
    <Options bind:open bind:value {options} />
</span>

<style>
    button {
        @apply px-6 py-2;
        @apply bg-slate-700;
        @apply rounded-full;
        @apply text-white;
    }

    button:not(:disabled):after {
        content: '▼';
        font-size: 0.75em;
        line-height: 1.25em;
    }
    button:disabled input {
        @apply outline-none;
    }

    input {
        @apply bg-transparent;
        @apply text-center font-thin;
    }
</style>
