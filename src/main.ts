/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-07-09 10:43:04
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-25 15:23:00
 */
import App from './App.vue'
import { store } from './store'
import * as ElIconModules from '@element-plus/icons'
import router from './router'
import Particles from 'particles.vue3'
import '@/styles/index.scss'

const app = createApp(App)
app.use(Particles).use(store).use(router).mount('#app')
// 统一注册Icon图标
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName]
    app.component(iconName, item)
  }
}
