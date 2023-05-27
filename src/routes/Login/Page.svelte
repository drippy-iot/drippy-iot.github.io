<script lang="ts">
    import FaUser from 'svelte-icons/fa/FaUser.svelte';
    import FaShieldAlt from 'svelte-icons/fa/FaShieldAlt.svelte';

    import Layout from '../../components/Layout.svelte';
    import TabItem from '../../components/Tab/TabItem.svelte';
    import TabGroup from '../../components/Tab/TabGroup.svelte';
    import Drippy from '../../assets/drippy-animated.svelte';
    import Background from './Background.svelte';
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
    <Background />
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
    main {
        @apply wrapper pb-12;
        @apply flex flex-col items-center justify-evenly;
    }

    .logo h1 {
        @apply text-center leading-loose;
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
