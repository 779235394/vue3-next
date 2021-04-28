/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-27 14:41:45
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-04-28 14:25:26
 */
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
      redirect: '/dashboard',
      children: [
        ...routeModuleList,
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login.vue'),
    },
  ],
})

export default router
