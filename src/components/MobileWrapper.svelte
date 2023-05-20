<div>
    <main>
        <slot />
    </main>
</div>

<style>
    div {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: clamp(340px, 100svw, 540px);
        height: clamp(640px, 100svh, 960px);

        --border-size: 16px;
        --border-radius: 16px;

        border: var(--border-size) solid gray;
        border-radius: var(--border-radius);
    }
    main {
        position: relative;
        height: 100%;
        width: 100%;

        margin-top: calc(-1 * var(--border-size) / 2);
        margin-left: calc(-1 * var(--border-size) / 2);
        border: calc(var(--border-size) / 2) solid black;
        border-radius: var(--border-radius);

        overflow: auto;
    }
</style>
