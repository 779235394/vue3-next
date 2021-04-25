import {defineConfig} from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

/**
 * @param {dir} dir is path
 * @return {dir} dir is path
 */
function resolve(dir) {
  return path.join(__dirname, dir);
}

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {'@': resolve('src')}
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "@/styles/BaseStyle.scss";'
      }
    }
  }
});
