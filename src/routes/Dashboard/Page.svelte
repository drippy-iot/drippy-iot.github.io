<script>
    import Layout from '../../components/Layout.svelte';
    import Select from '../../components/Select/Select.svelte';
    import Text from '../../components/Text.svelte';
    import Background from './Background.svelte';
    import COLORS from 'tailwindcss/colors';

    const options = ['ad:ad:ad:ad', '00:00:00:00', 'co:de:ba:be'];
    let value = options[0];
</script>

<Layout>
    <div class="wrapper flex flex-col items-center p-4 text-sm">
        <h1>Dashboard Page</h1>

        <span class="flex w-full justify-between">
            <Select {options} bind:value disabled>Device Mac:</Select>
            <Text --text-bg={COLORS.green[500]}>Connected</Text>
        </span>
        <Background />
    </div>
</Layout>
