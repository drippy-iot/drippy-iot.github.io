<script lang="ts">
    import { onMount } from 'svelte';
    import { flow } from './mock.ts';
    import Chart from 'chart.js/auto';
    import type { ChartConfiguration } from 'chart.js';
    import 'chartjs-adapter-date-fns';
    import ChartStreaming from 'chartjs-plugin-streaming';
    import ChartZoom from 'chartjs-plugin-zoom';

    Chart.register(ChartStreaming);
    Chart.register(ChartZoom);

    let canvas: HTMLCanvasElement;

    // Chart Configuration Data
    const data: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                cubicInterpolationMode: 'monotone',
                tension: 0.1,
            },
        ],
    };

    // Chart Configuration Options
    const options: ChartConfiguration['options'] = {
        scales: {
            x: {
                type: 'realtime',
                time: {
                    unit: 'second',
                },
            },
        },
        plugins: {
            streaming: {
                duration: 20000,
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
        chart?.update('quiet');
    }

    onMount(() => {
        // Attach chart to HTMLCanvasElement.
        new Chart(canvas, { type: 'line', data, options });
    });
</script>

<canvas bind:this={canvas} />
