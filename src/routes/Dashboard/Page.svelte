<script>
    import Layout from '../../components/Layout.svelte';
    import Select from '../../components/Select/Select.svelte';
    import Text from '../../components/Tab/Text.svelte';
    import Background from './Background.svelte';

    const options = ['ad:ad:ad:ad', '00:00:00:00', 'co:de:ba:be'];
    let value = options[0];
</script>

<Layout>
    <div class="wrapper">
        <h1>Dashboard Page</h1>

        <span class="select-row">
            <Select {options} bind:value disabled>Device Mac:</Select>
            <Text>Connected</Text>
        </span>
        <Background />
    </div>
</Layout>

<style>
    div.wrapper {
        @apply flex flex-col items-center p-4;
        @apply text-sm;
    }
    .select-row {
        @apply flex w-full justify-between;
        --text-bg: theme(colors.green.500);
    }
</style>
