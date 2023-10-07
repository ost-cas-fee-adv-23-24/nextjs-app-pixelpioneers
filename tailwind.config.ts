import type { Config } from 'tailwindcss'

const config: Config = {
  // TODO: Later we also need to prepare the preset stuff, speaks to System Token / Token ID
  // presets: [require('@ost-cas-fee-adv-23-24/design-system-pixelpioneers/preset')],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@ost-cas-fee-adv-23-24/design-system-pixelpioneers/lib/esm/components/**/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
