/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2022-02-09 15:37:04
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-03-10 18:15:48
 */
import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvg } from './src/icons/index'
export default defineConfig({
  base: '/vue3-next/',
  plugins: [
    vue(),
    PkgConfig(),
    OptimizationPersist(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vuex'],
      resolvers: [ElementPlusResolver()],
      dts: './src/auto-imports.d.ts',
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: './src/components.d.ts',
    }),
    createSvg('./src/icons/svg/'),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'src/components'),
    },
    extensions: ['.js', '.ts', '.vue', '.json'],
  },
  build: {
    target: 'modules',
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "@/styles/BaseStyle.scss";',
      },
    },
  },
})
