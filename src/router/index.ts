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

/**
 * @param {property} property 待排序字段
 * @return {value} 返回值
 */
function compare(property) {
  return function(obj1, obj2) {
    const value1 = obj1['meta'][property]
    const value2 = obj2['meta'][property]
    return value1 - value2 // 升序
  }
}

let routeModuleList: any[] = []
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  routeModuleList.push(...mod)
})

routeModuleList = routeModuleList.sort(compare('sort'))

console.log(routeModuleList)
const router: any = createRouter({
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
          meta: { title: '首页', noCache: true, icon: 'el-icon-house', affix: true },
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
