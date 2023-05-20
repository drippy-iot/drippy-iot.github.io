import plugin from 'tailwindcss/plugin';
/** @type {import('tailwindcss').Config} */

export default {
    content: ['./src/**/*.{html,js,ts,svelte}'],
    theme: {
        extend: {},
    },
    plugins: [
        plugin(({ addComponents }) =>
            addComponents({
                '.wrapper': {
                    height: '100%',
                    width: '100%',
                },
            })
        ),
    ],
};
