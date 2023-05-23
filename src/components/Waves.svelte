<script lang="ts">
    export let ds: string[];
    export let duration: string;

    $: [first, ..._] = ds;
    $: points = typeof first === 'undefined' ? ds : [...ds, first];
    $: values = points.join(';');
</script>

<svg
    viewBox="0 0 1440 320"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
>
    <path fill="currentColor">
        <animate
            attributeName="d"
            dur={duration}
            repeatCount="indefinite"
            {values}
        />
    </path>
</svg>
