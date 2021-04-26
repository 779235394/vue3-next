/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-26 10:35:04
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-04-26 10:37:28
 */
/**
 * @Author: junlan.he
 * @date: 2021/4/23
 * @desc:
 */

const BaseRouter: any = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../../views/Login/index.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../../views/dashboard/index.vue')
  },
  {
    path: '/Text',
    name: 'Text',
    component: () => import('../../views/Text.vue')
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../../views/Home.vue')
  }
];

export default BaseRouter;
