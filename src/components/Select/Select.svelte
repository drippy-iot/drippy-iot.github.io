<script>
    import Options from './Options.svelte';

    export let name;
    export let value;

    let open = true;
</script>

<div>
    <button on:click={() => (open = !open)}>
        <label for={name}> Device Mac:</label>

        <input
            type="text"
            {name}
            size={value.toString().length}
            readonly
            bind:value
        />
    </button>
    <Options bind:open />
</div>

<style>
    button {
        @apply px-6 py-2;
        @apply bg-slate-700;
        @apply rounded-full;
        @apply text-white;
    }

    input {
        @apply bg-transparent;
        @apply text-center font-thin;
    }

    div {
        @apply wrapper;
    }
</style>
