<script lang="ts">
    import FaUser from 'svelte-icons/fa/FaUser.svelte';
    import FaShieldAlt from 'svelte-icons/fa/FaShieldAlt.svelte';

    import Layout from '../../components/Layout.svelte';
    import TabItem from '../../components/Tab/TabItem.svelte';
    import TabGroup from '../../components/Tab/TabGroup.svelte';
    import { TOP_BLOB, BOT_BLOB } from './blobPaths';
    import AnimatedBlob from '../../components/AnimatedBlob.svelte';
    import Drippy from '../../assets/drippy-animated.svelte';
    let user = true;
</script>

<Layout>
    <main>
        <div class="logo">
            <Drippy />
            <h1>Drippy</h1>
        </div>
        <form on:submit|preventDefault>
            <input type="text" />
            <button class:user>Login</button>
        </form>
    </main>

    <div class="blob top">
        <AnimatedBlob ds={TOP_BLOB} duration="20s" />
    </div>
    <div class="blob bot">
        <AnimatedBlob ds={BOT_BLOB} duration="28s" />
    </div>
    <TabGroup>
        <TabItem on:click={() => (user = true)} active={user}>
            <FaUser />
        </TabItem>
        <TabItem on:click={() => (user = false)} active={!user}>
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

    .logo h1 {
        @apply text-center text-3xl leading-loose;
    }

    button {
        @apply w-full p-4;
        @apply bg-yellow-500;
        @apply text-center text-white;
    }

    button.user {
        @apply bg-blue-500;
    }

    input {
        @apply w-full p-4;
        @apply border border-slate-400;
    }

    form {
        @apply w-1/2;
    }

    form input {
        @apply mb-16;
    }
</style>
