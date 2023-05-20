<script>
    import Router from 'svelte-spa-router';

    import Dashboard from './routes/Dashboard/Page.svelte';
    import Login from './routes/Login/Page.svelte';

    const routes = {
        '/': Login,
        '/dash': Dashboard,
    };
</script>

<Router {routes} />
