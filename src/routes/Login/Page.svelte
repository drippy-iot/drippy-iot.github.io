<script lang="ts">
    import FaUser from 'svelte-icons/fa/FaUser.svelte';
    import FaShieldAlt from 'svelte-icons/fa/FaShieldAlt.svelte';

    import Layout from '../../components/Layout.svelte';
    import TabItem from '../../components/Tab/TabItem.svelte';
    import TabGroup from '../../components/Tab/TabGroup.svelte';
    import { TOP_BLOB, BOT_BLOB } from './blobPaths';
    import AnimatedBlob from '../../components/AnimatedBlob.svelte';
    import Drippy from '../../assets/drippy-animated.svelte';
    let isUser = true;
</script>

<Layout>
    <main>
        <h1>Login Page: {isUser}</h1>
        <div class="logo">
            <Drippy />
        </div>
    </main>

    <div class="blob top">
        <AnimatedBlob ds={TOP_BLOB} duration="20s" />
    </div>
    <div class="blob bot">
        <AnimatedBlob ds={BOT_BLOB} duration="28s" />
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
        @apply w-[720px];
    }
    .top {
        @apply left-[-420px] top-[-245px];
    }
    .bot {
        @apply bottom-[-144px] right-[-420px];
    }
    main {
        @apply wrapper pb-12;
        @apply flex flex-col items-center justify-evenly;
    }
</style>
