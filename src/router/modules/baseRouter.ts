/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-26 10:35:04
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-04-28 11:42:55
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
    meta: { title: '首页', noCache: true, icon: 'el-icon-house' },
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../../views/Home.vue'),
    meta: { title: '测试页1', noCache: true, icon: 'el-icon-smoking' },
  },
  {
    path: '/Home1',
    name: 'Home1',
    component: () => import('../../views/Home.vue'),
    meta: { title: '测试页2', noCache: true, icon: 'el-icon-smoking' },
    children: [{
      path: '/Home11',
      name: 'Home11',
      component: () => import('../../views/Home.vue'),
      meta: { title: '测试页2', noCache: true, icon: 'el-icon-smoking' },
    }, {
      path: '/Home12',
      name: 'Home12',
      component: () => import('../../views/Home.vue'),
      meta: { title: '测试页2', noCache: true, icon: 'el-icon-smoking' },
    }],
  },
]

export default BaseRouter
