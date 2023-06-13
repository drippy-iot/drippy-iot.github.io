<script lang="ts">
    import { format } from 'date-fns';
    export let ty: "close" | "bypass" | "open" | "flow";
    export let ts: Date;

    const LABELS = {
        open: 'Bypass: Valve set to open',
        close: 'Bypass: Valve set to close',
        bypass: 'Bypass: Bypass mode released',
        flow: 'Closed valve due to leak detection',
    };
</script>

<span
    class="relative grid shrink-0 overflow-hidden rounded-2xl p-4 text-base"
    data-ty={ty}
    data-ts={format(ts, 'MMM dd h:mm:ss a')}
>
    {LABELS[ty]}
</span>

<style>
    span[data-ty='bypass'] {
        @apply bg-slate-500 text-white;
    }
    span[data-ty='flow'] {
        @apply bg-red-500 text-white;
    }
    span[data-ty='open'] {
        @apply bg-white text-slate-900;
    }
    span[data-ty='close'] {
        @apply bg-slate-900 text-white;
    }
    span::after {
        @apply justify-self-end text-xs opacity-50;
        content: attr(data-ts);
    }
</style>
