<script>
    import Dashboard from './routes/Dashboard/Page.svelte';
    import Login from './routes/Login/Page.svelte';
    import Router from 'svelte-spa-router';

    const routes = {
        '/': Login,
        '/dash': Dashboard,
    };
</script>

<Router {routes} />
