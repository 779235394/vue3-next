import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/vue3-next/',
  plugins: [vue()],
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
