import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/modules/**/*.{vue,js,ts,jsx,tsx,html}'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
