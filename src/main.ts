import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'
// import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/packages/theme-chalk/src/index.scss'
import locale from 'element-plus/lib/locale/lang/zh-cn' // 中文
import ElementPlus from 'element-plus'
import router from './router'
import Particles from 'particles.vue3'
import '@/styles/index.scss'

const app = createApp(App)
app.use(Particles)
    .use(ElementPlus, { locale })
    .use(store)
    .use(router)
    .mount('#app')
