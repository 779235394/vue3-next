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

const router:any = createRouter({
  history: createWebHistory(),
  strict: true,
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('../views/layout/index.vue'),
      redirect: '/Home',
      children: [
        ...routeModuleList,
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/login.vue'),
    },
  ],
})

export default router
