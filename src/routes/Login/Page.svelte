<script lang="ts">
    import FaUser from 'svelte-icons/fa/FaUser.svelte';
    import FaShieldAlt from 'svelte-icons/fa/FaShieldAlt.svelte';

    import Layout from '../../components/Layout.svelte';
    import TabItem from '../../components/Tab/TabItem.svelte';
    import TabGroup from '../../components/Tab/TabGroup.svelte';
    import { TOP_BLOB, BOT_BLOB } from './blobPaths';
    import AnimatedBlob from '../../components/AnimatedBlob.svelte';

    let isUser = true;
</script>

<Layout>
    <h1>Login Page: {isUser}</h1>
    <div class="blob top">
        <AnimatedBlob ds={TOP_BLOB} duration="5s" />
    </div>
    <div class="blob bot">
        <AnimatedBlob ds={BOT_BLOB} duration="7s" />
    </div>
    <TabGroup>
        <TabItem on:click={() => (isUser = true)} active={isUser}>
            <FaUser />
        </TabItem>
        <TabItem on:click={() => (isUser = false)} active={!isUser}>
            <FaShieldAlt />
        </TabItem>
    </TabGroup>
</Layout>

<style>
    .blob {
        @apply text-blue-300;
        @apply fixed z-[-999];
        @apply w-[150%];
    }
    .top {
        @apply left-[-60%] top-[-34%];
    }
    .bot {
        @apply visible;
        @apply bottom-[-20%] right-[-60%];
    }
</style>
