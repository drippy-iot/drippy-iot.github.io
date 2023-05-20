<script lang="ts">
    import FaUser from 'svelte-icons/fa/FaUser.svelte';
    import FaShieldAlt from 'svelte-icons/fa/FaShieldAlt.svelte';
    import { link } from 'svelte-spa-router';

    import Layout from '../../components/Layout.svelte';
    import TabItem from '../../components/Tab/TabItem.svelte';
    import TabGroup from '../../components/Tab/TabGroup.svelte';

    let isUser = true;
</script>

<Layout>
    <h1>Login Page: {isUser}</h1>
    <TabGroup>
        <TabItem on:click={() => (isUser = true)} active={isUser}>
            <FaUser />
        </TabItem>
        <TabItem on:click={() => (isUser = false)} active={!isUser}>
            <FaShieldAlt />
        </TabItem>
    </TabGroup>
</Layout>
