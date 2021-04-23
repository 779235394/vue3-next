import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';

/**
 * @param {dir} dir is File path.
 * @return {dir} dir is File path.
 */
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
export default defineConfig({
  resolve: {
    alias: [
      // /@/xxxx => src/xxxx
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/'
      }
    ]
  },
  plugins: [vue()]
});
