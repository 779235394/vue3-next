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
import Layout from '@/layout/components/Main/main.vue'
const BaseRouter: any = [
  {
    path: '/baseManager',
    name: 'BaseManager',
    component: Layout,
    meta: { title: '基础管理', noCache: true, icon: 'el-icon-smoking' },
    children: [
      {
        path: '/role',
        name: 'Role',
        component: () => import('../../views/baseManager/role.vue'),
        meta: { title: '角色管理', noCache: true, icon: 'el-icon-smoking' },
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('../../views/baseManager/user.vue'),
        meta: { title: '用户管理', noCache: true, icon: 'el-icon-smoking' },
      },
    ],
  },
]

export default BaseRouter
