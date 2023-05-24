<span>
    <slot />
</span>

<style>
    span {
        background: var(--text-bg, white);
        color: var(--text-fg, theme(colors.slate.900));
        @apply flex items-center rounded-full px-4 py-1;
    }
</style>
