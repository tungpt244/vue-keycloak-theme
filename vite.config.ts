import { defineConfig } from 'vite'
import { resolve } from 'path'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import svgLoader from 'vite-svg-loader'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import Unfonts from 'unplugin-fonts/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    minify: false,
    rollupOptions: {
      input: {
        login: resolve(__dirname, 'src/modules/login/index.html'),
        register: resolve(__dirname, 'src/modules/register/index.html'),
      },
      output: {
        assetFileNames: () => `style[extname]`,
        entryFileNames: () => `[name].js`,
        chunkFileNames: () => `main.js`,
      },
    },
  },
  plugins: [
    Vue(),
    Components({
      globs: ['src/layouts/*.vue', 'src/components/*.vue'],
      deep: true,
      dts: 'src/components.d.ts',
      extensions: '.vue',
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [ElementPlusResolver(), IconsResolver()],
    }),
    svgLoader({
      svgo: false,
    }),
    VueI18nPlugin({
      include: resolve(__dirname, 'src/locales/**'),
      strictMessage: false,
    }),
    Unfonts({
      google: {
        preconnect: true,
        families: [{ name: 'Inter', styles: 'ital,wght@0,400;0,500;0,600;0,700' }],
      },
    }),
    Icons({
      autoInstall: true,
    }),
  ],
})
