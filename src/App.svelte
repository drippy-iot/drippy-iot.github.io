<script>
    import Router from 'svelte-spa-router';

    import Dashboard from './routes/Dashboard/Page.svelte';
    import Login from './routes/Login/Page.svelte';

    import { register } from './register.ts';
    import { session } from './stores/session.ts';

    const routes = {
        '/': Login,
        '/dash': Dashboard,
    };

</script>

<main>
    {#await register()}
        Loading service worker.
    {:then}
        <Router {routes} />
    {/await}
</main>
