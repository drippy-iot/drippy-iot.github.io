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
    <div class="wrapper" on:click|stopPropagation>wqojoejqw</div>
</dialog>
