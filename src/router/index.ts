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
      component: () => import('../layout/index.vue'),
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../views/dashboard.vue'),
          meta: { title: '首页', noCache: true, icon: 'el-icon-house' },
        },
        ...routeModuleList,
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../login/login.vue'),
    },
  ],
})

export default router
