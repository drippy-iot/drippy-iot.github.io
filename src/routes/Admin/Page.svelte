<script lang="ts">
    import COLORS from 'tailwindcss/colors';
    import FaSignOutAlt from 'svelte-icons/fa/FaSignOutAlt.svelte';
    import { assert } from '../../assert';
    import { session } from '../../stores/session';
    import { replace } from 'svelte-spa-router';
    import { getSystemMetrics } from '../../sdk/metrics';
    import {
        systemMetricsListener,
        systemMetricsEvents,
        systemMetricsFlow,
    } from '../../stores/systemmetrics';
    import { startOfDay } from 'date-fns';

    import Layout from '../../components/Layout.svelte';
    import LogItem from '../../components/LogItem.svelte';
    import Select from '../../components/Select/Select.svelte';
    import Text from '../../components/Text.svelte';
    import Background from './Background.svelte';

    import Display from '../../components/Chart/Display.svelte';
    import { GRAN_OPTS } from './constants';
    import { Granularity } from '../../components/Chart/types';
    import { logout } from '../../sdk/auth';

    // Redirect to Login on no session

    const sessionReady = session.reload?.().then(session => {
        if (session === null) replace('/');
    });

    // Flatten objects to array of labels.
    let GRANULARITY_OPTIONS = GRAN_OPTS.map(option => option.label);

    function getGranularity(
        granularity: Granularity,
        key: 'label' | 'value' = 'value'
    ) {
        const match = GRAN_OPTS.filter(opt => opt[key] == granularity);
        assert(match.length == 1);
        return match[0];
    }

    async function handleLogout() {
        replace('/');
    }
    let value = 'Realtime';

    $: granularity = getGranularity(value, 'label');

    $: getSystemMetrics(
        systemMetricsListener,
        startOfDay(new Date()),
        granularity?.value === Granularity.REALTIME
            ? undefined
            : granularity?.value
    ).catch(console.error);
</script>

{#await sessionReady}
    <p>Loading session.</p>
{:then}
    <Layout>
        <div class="wrapper flex flex-col gap-4 p-4 text-xs">
            <div>
                <h2>Welcome</h2>
                <h1>Administrator</h1>
            </div>
            <div class="relative -left-4 max-h-[30cqh] w-[100cqw]">
                <Display flowDataSource={$systemMetricsFlow} />
                <span class="absolute bottom-full right-4">
                    <Select
                        name="granularity"
                        bind:value
                        options={GRANULARITY_OPTIONS}
                    />
                </span>
            </div>
            {#if $session !== null}
                <div class="flex justify-between">
                    <div>
                        Device Mac: {$session.mac}
                    </div>
                    <Text --text-bg={COLORS.green[500]}>Connected</Text>
                </div>
            {/if}
            <h2 class="block">System Log:</h2>
            <div class="flex flex-1 flex-col gap-2 overflow-y-auto">
                {#each $systemMetricsEvents as metricEvent}
                    <LogItem {...metricEvent} />
                {:else}
                    <p>No events logged yet.</p>
                {/each}
            </div>
        </div>
        <div class="fixed bottom-0 flex h-12 w-full bg-slate-900">
            <button
                on:click={handleLogout}
                class="absolute bottom-0 right-4 top-0 my-auto h-5 w-5 text-white"
            >
                <FaSignOutAlt />
            </button>
        </div>
        <Background />
    </Layout>
{:catch err}
    <p>{err}</p>
{/await}

<style>
    .wrapper {
        @apply h-full w-full;
        /* original bottom padding + tabgroup */
        padding-bottom: calc(theme(spacing.4) + theme(spacing.12));
    }
</style>
