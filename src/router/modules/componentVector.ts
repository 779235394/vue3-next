/**
 * @Author: junlan.he
 * @date: 2021/5/21
 * @desc:
 */
import Layout from '@/layout/components/Main/main.vue'

const componentVector:any=[
  {
    path: '/componentVector',
    name: 'ComponentVector',
    component: Layout,
    redirect: '/table',
    meta: { title: '物料广场', noCache: true, icon: 'el-icon-smoking', sort: 2 },
    children: [
      {
        path: '/table',
        name: 'Table',
        component: () => import('../../views/componentVector/table.vue'),
        meta: { title: '表格', noCache: true, icon: 'el-icon-smoking' },
      },
      {
        path: '/dynamicTable',
        name: 'DynamicTable',
        component: () => import('../../views/componentVector/dynamicTable.vue'),
        meta: { title: '动态表格', noCache: true, icon: 'el-icon-smoking' },
      },
      {
        path: '/tableDetails/:id',
        name: 'TableDetails',
        component: () => import('../../views/componentVector/tableDetails.vue'),
        meta: { title: 'table列表详情页', noCache: true, icon: 'el-icon-smoking', activeMenu: '/dynamicTable' },
        hidden: true,
      },
    ],
  },
]

export default componentVector
