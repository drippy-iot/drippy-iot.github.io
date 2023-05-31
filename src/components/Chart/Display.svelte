<script lang="ts">
    import { onMount } from 'svelte';
    import { flow } from './mock.ts';
    import Chart from 'chart.js/auto';
    import type { ChartConfiguration } from 'chart.js';
    import 'chartjs-adapter-date-fns';

    let canvas: HTMLCanvasElement;

    const data: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
            },
        ],
    };

    const options: ChartConfiguration['options'] = {
        scales: {
            x: {
                type: 'timeseries',
                time: {
                    unit: 'second',
                },
            },
        },
    };

    $: {
        // Update chart upon retrieving data and clear buffer.
        const chart = Chart.getChart(canvas);
        chart?.data.datasets[0]?.data.push(
            ...$flow.map(flow => ({ x: flow.ts.getTime(), y: flow.flow }))
        );
        $flow = [];
        chart?.update();
    }

    onMount(() => {
        // Attach chart to HTMLCanvasElement.
        new Chart(canvas, { type: 'line', data, options });
    });
</script>

<canvas bind:this={canvas} />
