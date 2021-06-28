import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

/**
 * @param {dir} dir is path
 * @return {dir} dir is path
 */
function resolve(dir) {
  return path.join(__dirname, dir)
}

export default defineConfig({
  base: '/vue3-next/',
  plugins: [vue()],
  resolve: {
    alias: { '@': resolve('src') },
    extensions: ['.js', '.ts', '.vue', '.json'],
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
