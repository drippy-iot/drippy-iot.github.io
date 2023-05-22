<script>
    export let name;
    export let value;
</script>

<button>
    <label for={name}> Device Mac:</label>

    <input type="text" {name} bind:value />
</button>

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
</style>
