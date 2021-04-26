/**
 * @Author: junlan.he
 * @date: 2021/4/23
 * @desc:
 */
import { createRouter, createWebHistory } from 'vue-router'

const modules = import.meta.globEager('./modules/**/*.ts')
const routeModuleList: any[] = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  routeModuleList.push(...mod)
})

const router = createRouter({
  history: createWebHistory(),
  strict: true,
  routes: [
    ...routeModuleList,
  ],
})

export default router
