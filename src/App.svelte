<script>
    import Router from 'svelte-spa-router';

    import Dashboard from './routes/Dashboard/Page.svelte';
    import Login from './routes/Login/Page.svelte';
    import Admin from './routes/Admin/Page.svelte';

    import { register } from './register.ts';

    const routes = {
        '/': Login,
        '/dash': Dashboard,
        '/admin': Admin,
    };
</script>

<main>
    {#await register()}
        Loading service worker.
    {:then}
        <Router {routes} />
    {/await}
</main>
