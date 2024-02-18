import type { Config } from 'tailwindcss';

const config: Config = {
    presets: [require('@ost-cas-fee-adv-23-24/design-system-pixelpioneers/tailwind.config.js')],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './compositions/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@ost-cas-fee-adv-23-24/design-system-pixelpioneers/lib/esm/components/**/*.js',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-poppins)'],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
export default config;
