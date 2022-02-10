/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-07-09 10:58:02
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-10 18:05:55
 */
/**
 * @Author: huangzihong
 * @date: 2021/5/21
 * @desc:
 */
import Layout from '@/layout/components/Main/main.vue'

const componentVector: any = [
  {
    path: '/componentVector',
    name: 'ComponentVector',
    component: Layout,
    redirect: '/dynamicTable',
    meta: { title: '物料广场', noCache: true, icon: 'Smoking', sort: 2 },
    children: [
      {
        path: '/dynamicTable',
        name: 'DynamicTable',
        component: () => import('../../views/componentVector/dynamicTable.vue'),
        meta: { title: '动态表格', noCache: true, icon: 'Smoking', keepAlive: true },
      },
      {
        path: '/dynamicForm',
        name: 'DynamicForm',
        component: () => import('../../views/componentVector/dynamicForm.vue'),
        meta: { title: '动态表单', noCache: true, icon: 'Smoking', keepAlive: true },
      },
      {
        path: '/tableDetails/:id',
        name: 'TableDetails',
        component: () => import('../../views/componentVector/tableDetails.vue'),
        meta: { title: 'table列表详情页', noCache: true, icon: 'Smoking', activeMenu: '/dynamicTable' },
        hidden: true,
      },
    ],
  },
]

export default componentVector
