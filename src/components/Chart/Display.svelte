<script lang="ts">
    import type { ChartConfiguration } from 'chart.js';
    import Chart from 'chart.js/auto';
    import ChartStreaming from '@robloche/chartjs-plugin-streaming';
    import ChartZoom from 'chartjs-plugin-zoom';
    import { onDestroy, onMount } from 'svelte';
    import colors from 'tailwindcss/colors';

    import 'chartjs-adapter-date-fns';

    import { createMock } from './mock.ts';
    import { Granularity } from './types.ts';
    import { assert } from '../../assert.ts';
    import { newFlow } from '../../stores/flow.ts';

    Chart.register(ChartStreaming);
    Chart.register(ChartZoom);
    Chart.defaults.color = colors.slate[500];
    Chart.defaults.font.family = 'Poppins, Arial, sans-serif';

    let canvas: HTMLCanvasElement;

    let chart: Chart;

    // Granularity is in the form of seconds. If left undefined,
    // backend uses the predetermined quantum as the selected granularity
    export let granularity: Granularity = Granularity.REALTIME;

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
                right: -25,
            },
        },
    };

    $: {
        // Update chart upon retrieving data and clear buffer.
        const chart = Chart.getChart(canvas);
        const points = $newFlow.splice(0).map(({ end, flow }) => ({
            x: end.getTime(),
            y: flow,
        }));
        $newFlow = $newFlow;
        chart?.data.datasets[0]?.data.push(...points);
        chart?.update('quiet');
    }

    onMount(() => {
        // Attach chart to HTMLCanvasElement.
        chart = new Chart(canvas, { type: 'line', data, options });
    });

    onDestroy(() => {
        chart.notifyPlugins('destroy');
        chart.destroy();
        clearInterval(interval);
    });
    let interval: number;
</script>

<canvas bind:this={canvas} />
