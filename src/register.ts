export async function register() {
    await navigator.serviceWorker.register(new URL('sw.ts', import.meta.url), {
        type: 'module',
        scope: '/',
    });
}