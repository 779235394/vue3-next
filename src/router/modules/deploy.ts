/**
 * @Author: junlan.he
 * @date: 2021/4/23
 * @desc:
 */
import Layout from '@/layout/components/Main/main.vue'
const deploy: any = [
  {
    path: '/deploy',
    name: 'Deploy',
    component: Layout,
    redirect: '/role',
    meta: { title: '配置', noCache: true, icon: 'el-icon-smoking', sort: 1 },
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

export default deploy
