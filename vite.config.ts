import { defineConfig } from 'vite'
import { resolve } from 'path'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'

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
      extensions: '.vue',
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),
  ],
})
