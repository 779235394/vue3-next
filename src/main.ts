/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-07-09 10:43:04
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-10 17:53:24
 */
import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'
import 'element-plus/dist/index.css'
import * as ElIconModules from '@element-plus/icons'
import locale from 'element-plus/lib/locale/lang/zh-cn' // 中文
import ElementPlus from 'element-plus'
import router from './router'
import Particles from 'particles.vue3'
import '@/styles/index.scss'

const app = createApp(App)
app.use(Particles).use(ElementPlus, { locale }).use(store).use(router).mount('#app')
// 统一注册Icon图标
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName]
    app.component(iconName, item)
  }
}
