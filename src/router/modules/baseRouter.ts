/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-26 10:35:04
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-04-27 10:57:25
 */
/**
 * @Author: junlan.he
 * @date: 2021/4/23
 * @desc:
 */

const BaseRouter: any = [

  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../../views/dashboard.vue'),
    meta: { title: '首页', noCache: true },
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../../views/Home.vue'),
    meta: { title: '测试页', noCache: true },
  },
]

export default BaseRouter
