<script lang="ts">
    import COLORS from 'tailwindcss/colors';
    import { format } from 'date-fns';
    import MdDashboard from 'svelte-icons/md/MdDashboard.svelte';
    import MdSettings from 'svelte-icons/md/MdSettings.svelte';

    import Layout from '../../components/Layout.svelte';
    import Select from '../../components/Select/Select.svelte';
    import Spacer from '../../components/Spacer.svelte';
    import TabGroup from '../../components/Tab/TabGroup.svelte';
    import TabItem from '../../components/Tab/TabItem.svelte';
    import Text from '../../components/Text.svelte';
    import Background from './Background.svelte';
    import Valve from '../../components/Valve.svelte';
    import type { Option } from '../../components/Select/types.ts';

    const options: Option[] = ['ad:ad:ad:ad', '00:00:00:00', 'co:de:ba:be'];
    let value: Option = options[0] || '';
    enum LogType {
        AUTO_CLOSE,
        MAN_CLOSE,
        OPEN,
    }

    const LOG_TYPE_COLORS = {
        [LogType.AUTO_CLOSE]: { bg: COLORS.slate[900], fg: COLORS.white },
        [LogType.MAN_CLOSE]: { bg: COLORS.slate[700], fg: COLORS.white },
        [LogType.OPEN]: { bg: COLORS.white, fg: COLORS.slate[900] },
    };

    const LOG_TYPE_TEXT = {
        [LogType.AUTO_CLOSE]: 'Automatically closed valve.',
        [LogType.MAN_CLOSE]: 'Manually closed valve.',
        [LogType.OPEN]: 'Valve has been reopened',
    };

    const LOGS = [
        {
            timestamp: new Date(),
            type: LogType.AUTO_CLOSE,
        },
        {
            timestamp: new Date(),
            type: LogType.OPEN,
        },
        {
            timestamp: new Date(),
            type: LogType.MAN_CLOSE,
        },

        {
            timestamp: new Date(),
            type: LogType.OPEN,
        },
        {
            timestamp: new Date(),
            type: LogType.MAN_CLOSE,
        },
        {
            timestamp: new Date(),
            type: LogType.OPEN,
        },
        {
            timestamp: new Date(),
            type: LogType.AUTO_CLOSE,
        },
    ];

    let active = true;
</script>

<Layout>
    <div class="wrapper flex flex-col items-center p-4 text-xs">
        <span class="w-full">
            <h2>Welcome</h2>
            <h1>Some-Dood</h1>
        </span>
        <Spacer --length="25cqh" />
        <span class="flex w-full justify-between">
            <Select name="mac" {options} bind:value disabled>
                Device Mac:
            </Select>
            <Text --text-bg={COLORS.green[500]}>Connected</Text>
        </span>
        <Spacer />
        <h2 class="w-full">System Log:</h2>
        <div class="flex h-[40cqh] w-full flex-col overflow-auto">
            {#each LOGS as log}
                <Text
                    --text-bg={LOG_TYPE_COLORS[log.type].bg}
                    --text-fg={LOG_TYPE_COLORS[log.type].fg}
                    >{format(log.timestamp, 'MMM d h:mm:ss')}-{LOG_TYPE_TEXT[
                        log.type
                    ]}</Text
                >
                <Spacer --length="0.5rem" />
            {/each}
        </div>
        <TabGroup>
            <div
                class="absolute left-1/2 top-[-75%] box-content h-14 w-14 translate-x-[-50%] transform rounded-full bg-white p-1.5"
            >
                <Valve bind:active on:click={() => (active = !active)} />
            </div>
            <TabItem active><MdDashboard /></TabItem>
            <TabItem><MdSettings /></TabItem>
        </TabGroup>
        <Background />
    </div>
</Layout>
