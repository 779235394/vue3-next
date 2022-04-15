/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2022-04-15 17:49:22
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-04-15 17:49:22
 */
/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-07-09 10:58:02
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-04-13 10:11:50
 */
/**
 * @Author: huangzihong
 * @date: 2021/5/21
 * @desc:
 */
import Layout from '@/layout/components/Main/main.vue'

const componentVector: any = [
  {
    path: '/component-vector',
    name: 'component-vector',
    component: Layout,
    redirect: '/dynamic-table',
    meta: { title: '物料广场', noCache: true, icon: 'Smoking', sort: 2 },
    children: [
      {
        path: '/dynamic-table',
        name: 'DynamicTable',
        component: () => import('../../views/component-vector/dynamic-table.vue'),
        meta: { title: '动态表格', noCache: true, icon: 'Smoking', keepAlive: true },
      },
      {
        path: '/dynamic-form',
        name: 'DynamicForm',
        component: () => import('../../views/component-vector/dynamic-form.vue'),
        meta: { title: '动态表单', noCache: true, icon: 'Smoking', keepAlive: true },
      },
      {
        path: '/form-designer',
        name: 'DtFormDesigner',
        component: () => import('../../views/component-vector/form-designer.vue'),
        meta: { title: '低代码表单', noCache: true, icon: 'Smoking', keepAlive: true },
      },
      {
        path: '/table-details/:id',
        name: 'TableDetails',
        component: () => import('../../views/component-vector/table-details.vue'),
        meta: { title: 'table列表详情页', noCache: true, icon: 'Smoking', activeMenu: '/dynamic-table' },
        hidden: true,
      },
    ],
  },
]

export default componentVector
