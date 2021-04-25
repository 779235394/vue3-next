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
