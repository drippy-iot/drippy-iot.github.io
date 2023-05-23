<script lang="ts">
    import type { Option } from './types.ts';

    export let open: boolean;
    export let options: Option[];
    export let value: Option;
    let dialog: HTMLDialogElement;

    $: if (dialog && open) dialog.showModal();

    function select(option: Option) {
        value = option;
    }

    function close() {
        open = false;
    }

    function outsideClick() {
        dialog.close();
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialog} on:click|self={outsideClick} on:close={close}>
    <ul on:click|stopPropagation>
        {#each options as option (option)}
            <li
                class:selected={value === option}
                on:click={() => select(option)}
            >
                {option}
            </li>
        {/each}
    </ul>
</dialog>

<style>
    ul {
        @apply wrapper bg-white;
    }

    dialog {
        @apply w-[80%];
    }

    dialog::backdrop {
        @apply bg-black opacity-30;
    }

    li {
        @apply p-4;
        @apply flex items-center justify-between;
    }

    li:after {
        content: ' ';
        @apply block h-3 w-3 rounded-full;
        @apply outline outline-2 outline-offset-2 outline-slate-900;
    }

    li.selected:after {
        @apply bg-blue-500;
    }
</style>
