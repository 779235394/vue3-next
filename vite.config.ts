/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-26 10:35:04
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-04-26 15:50:16
 */
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
