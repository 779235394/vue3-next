/**
 * @Author: junlan.he
 * @date: 2021/4/23
 * @desc:
 */

const BaseRouter: any = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../../views/Home.vue')
  },
  {
    path: '/Text',
    name: 'Text',
    component: () => import('../../views/Text.vue')
  }
];

export default BaseRouter;
