/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-26 10:35:04
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-04-26 17:08:22
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
    meta: { title: '测试子页', noCache: true },
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../../views/Home.vue'),
  },
]

export default BaseRouter
