<script lang="ts">
    import FaUser from 'svelte-icons/fa/FaUser.svelte';
    import FaShieldAlt from 'svelte-icons/fa/FaShieldAlt.svelte';

    import Layout from '../../components/Layout.svelte';
    import TabItem from '../../components/Tab/TabItem.svelte';
    import TabGroup from '../../components/Tab/TabGroup.svelte';
    import Drippy from '../../assets/drippy-animated.svelte';
    import Background from './Background.svelte';
    import { assert } from '../../assert.ts';
    import { login } from '../../sdk/auth.ts';
    import { replace } from 'svelte-spa-router';
    import { session } from '../../stores/session.ts';
    let user = true;

    async function handleSubmit(this: HTMLFormElement) {
        const formData = new FormData(this);
        const mac = formData.get('mac');
        assert(mac !== null && typeof mac === 'string');
        const split = mac.split(':');
        const parsed = split.map(hexstr => parseInt(hexstr, 16));
        const { buffer } = new Uint8Array(parsed);

        const status = await login(buffer);

        try {
            if (status) {
                await session.load();
                replace('/dash');
            } else return alert('MAC has not yet been registered.');
        } catch (err) {
            alert(err);
        }
    }

    $: if ($session !== null) replace('/dash');
</script>

<Layout>
    <main>
        <div class="logo">
            <Drippy />
            <h1>Drippy</h1>
        </div>
        <form on:submit|self|preventDefault|stopPropagation={handleSubmit}>
            <input
                type="text"
                name="mac"
                placeholder="aa:bb:cc:dd:ee:ff"
                required
                pattern={`[a-fA-F0-9]{2}:[a-fA-F0-9]{2}:[a-fA-F0-9]{2}:[a-fA-F0-9]{2}:[a-fA-F0-9]{2}:[a-fA-F0-9]{2}`}
            />
            <input type="submit" class:user value="Login" />
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

    input[type="submit"] {
        @apply w-full p-4;
        @apply bg-yellow-500;
        @apply text-center text-white;
    }

    input[type="submit"].user {
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
