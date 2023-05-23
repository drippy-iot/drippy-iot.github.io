<script lang="ts">
    export let ds: string[];
    export let duration: string;
</script>

<svg
    viewBox="0 0 200 200"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
>
    <path fill="currentColor" transform="translate(100 100)">
        <animate
            attributeName="d"
            dur={duration}
            repeatCount="indefinite"
            values={[...ds, ds[0]].join(';')}
        />
    </path>
</svg>
