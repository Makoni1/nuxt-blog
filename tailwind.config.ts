import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./components/**/*.{vue,js,ts}', './pages/**/*.{vue,js,ts}'],
    theme: {
        extend: {
            colors: {
                primary:        '#6F5AFE',
                primaryLight:   '#9283FF',
                surface:        '#F7F7FD',
                textPrimary:    '#2E2D5A',
            },
        },
    },
}
export default config
