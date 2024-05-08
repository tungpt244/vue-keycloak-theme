import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/**/*.{vue,js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      spacing: {
        'mehub-h-sm': 'var(--mehub-header-height-small)',
        'mehub-h-md': 'var(--mehub-header-height-medium)',
        'mehub-h-lg': 'var(--mehub-header-height-large)',

        'mehub-w-lg': 'var(--mehub-content-width-large)',
        'mehub-w-md': 'var(--mehub-content-width-medium)',
        'mehub-w-sm': 'var(--mehub-content-width-small)',
      },
      colors: {
        primary: '#1677FF',
        info: '#053FFF',
        success: '#52C41A',
        danger: '#F5222D',
        warning: '#E6A23C',
        deactive: '#A6A6A6',
        'primary-text': '#0C0C0C',
        'secondary-text': '#878B96',
        grey: {
          0: '#FFFFFF',
          1: '#F6F6F6',
          2: '#E6E6E6',
          3: '#D9D9D9',
          4: '#CCCCCC',
          5: '#A6A6A6',
          6: '#666666',
          7: '#222222',
          8: '#121212',
          9: '#0C0C0C',
        },
        blue: {
          9: '#001D66',
          7: '#003EB3',
          5: '#1677FF',
          4: '#4096FF',
          2: '#91CAFF',
          1: '#BAE0FF',
          0: '#E6F4FF',
        },
        red: {
          9: '#092B00',
          5: '#F5222D',
          4: '#FF4D4F',
          1: '#FFCCC7',
        },
        green: {
          9: '#092B00',
          7: '#237804',
          1: '#D9F7BE',
        },
        orange: {
          9: '#612500',
          1: '#FFE7BA',
        },
        purple: {
          9: '#120338',
          7: '#391085',
          1: '#EFDBFF',
        },
        base: {
          'grey-0': '#FFFFFF',
          'grey-1': '#F6F6F6',
          'grey-2': '#E6E6E6',
          'grey-3': '#D9D9D9',
          'grey-4': '#CCCCCC',
          'grey-5': '#A6A6A6',
          'grey-6': '#666666',
          'grey-7': '#222222',
          'grey-8': '#121212',
          'grey-9': '#0C0C0C',
        },
        link: '#1677FF',
        border: {
          DEFAULT: '#E6E6E6',
        },
      },
      fontSize: {
        '3xl': ['28px', '36px'],
        '4xl': ['32px', '40px'],
        '5xl': ['40px', '48px'],
        '6xl': ['48px', '56px'],
        '7xl': ['56px', '64px'],
        '8xl': ['60px', '72px'],
      },
      screens: {
        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '800px',
        // => @media (min-width: 800px) { ... }

        lg: '1200px',
        // => @media (min-width: 1200px) { ... }

        xl: '1600px',
        // => @media (min-width: 1600px) { ... }

        '2xl': '1920px',
        // => @media (min-width: 1920px) { ... }
      },
      aspectRatio: {
        '3/4': '3 / 4',
        '4/3': '4 / 3',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  //@ts-ignore
  plugins: ['prettier-plugin-tailwindcss'],
} satisfies Config
