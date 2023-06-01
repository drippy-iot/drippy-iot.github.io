<script lang="ts">
    import { onMount } from 'svelte';
    import { flow } from './mock.ts';
    import Chart from 'chart.js/auto';
    import type { ChartConfiguration } from 'chart.js';
    import 'chartjs-adapter-date-fns';
    import ChartStreaming from 'chartjs-plugin-streaming';
    import ChartZoom from 'chartjs-plugin-zoom';
    import colors from 'tailwindcss/colors';

    Chart.register(ChartStreaming);
    Chart.register(ChartZoom);
    Chart.defaults.color = colors.slate[500];
    Chart.defaults.font.family = 'Poppins, Arial, sans-serif';

    let canvas: HTMLCanvasElement;

    // Chart Configuration Data
    const data: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                fill: 'start',
                backgroundColor: colors.blue[200],
                borderColor: colors.blue[500],
                pointStyle: false,
            },
        ],
    };

    // Chart Configuration Options
    const options: ChartConfiguration['options'] = {
        scales: {
            x: {
                type: 'realtime',
                time: {
                    minUnit: 'second',
                    displayFormats: {
                        minute: 'mm:ss',
                        second: 'mm:ss',
                        hour: 'h:mm a',
                    },
                },
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
            },
            y: {
                border: {
                    display: false,
                },
                grid: {
                    color: `${Chart.defaults.color}20`,
                },
                ticks: {
                    mirror: true,
                    padding: 10,
                    stepSize: 10,
                    z: 1,
                },
                suggestedMax: 100,
                beginAtZero: true,
            },
        },
        plugins: {
            streaming: {
                duration: 20000,
                ttl: 3600000,
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'x',
                },
                pan: {
                    enabled: true,
                    mode: 'x',
                },
            },
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        layout: {
            autoPadding: false,
            padding: {
                left: -25,
                right: -5,
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
