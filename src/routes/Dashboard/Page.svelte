<script lang="ts">
    import COLORS from 'tailwindcss/colors';
    import MdDashboard from 'svelte-icons/md/MdDashboard.svelte';
    import MdSettings from 'svelte-icons/md/MdSettings.svelte';

    import Layout from '../../components/Layout.svelte';
    import LogItem from '../../components/LogItem.svelte';
    import Select from '../../components/Select/Select.svelte';
    import TabGroup from '../../components/Tab/TabGroup.svelte';
    import TabItem from '../../components/Tab/TabItem.svelte';
    import Text from '../../components/Text.svelte';
    import Background from './Background.svelte';
    import Valve from '../../components/Valve.svelte';
    import type { Option } from '../../components/Select/types.ts';

    import { OPTIONS } from './constants.ts';
    import Display from '../../components/Chart/Display.svelte';

    let value: Option = OPTIONS[0] || '';

    let active = true;
</script>

<Layout>
    <div class="wrapper flex flex-col gap-4 p-4 text-xs">
        <div>
            <h2>Welcome</h2>
            <h1>Some-Dood</h1>
        </div>
        <div class="relative -left-4 max-h-[30cqh] w-[100cqw]">
            <Display />
        </div>
        <div class="flex justify-between">
            <Select name="mac" options={OPTIONS} bind:value disabled>
                Device Mac:
            </Select>
            <Text --text-bg={COLORS.green[500]}>Connected</Text>
        </div>
        <h2 class="block">System Log:</h2>
        <div class="flex flex-1 flex-col gap-2 overflow-y-auto">
            <LogItem item={{ ty: 'bypass', ts: new Date() }} />
            <LogItem item={{ ty: 'open', ts: new Date() }} />
            <LogItem item={{ ty: 'close', ts: new Date() }} />
            <LogItem
                item={{ ty: 'flow', flow: 1, leak: true, ts: new Date() }}
            />
        </div>
    </div>
    <TabGroup>
        <TabItem active><MdDashboard /></TabItem>
        <TabItem><MdSettings /></TabItem>
    </TabGroup>
    <div
        class="absolute bottom-4 left-0 right-0 mx-auto box-content h-14 w-14 rounded-full bg-white p-1.5"
    >
        <Valve bind:active on:click={() => (active = !active)} />
    </div>
    <Background />
</Layout>

<style>
    .wrapper {
        @apply h-full w-full;
        /* original bottom padding + tabgroup */
        padding-bottom: calc(theme(spacing.4) + theme(spacing.12));
    }
</style>
