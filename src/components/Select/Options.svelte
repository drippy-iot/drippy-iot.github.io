<script lang="ts">
    export let open: boolean;
    let dialog: HTMLDialogElement;

    $: if (dialog && open) dialog.showModal();
</script>

<dialog
    bind:this={dialog}
    on:click|self={() => dialog.close()}
    on:close={() => (open = false)}
>
    <ul on:click|stopPropagation>
        <li class="selected">Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
        <li>Option 4</li>
        <li>Option 5</li>
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
