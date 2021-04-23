/**
 * @Author: junlan.he
 * @date: 2021/4/23
 * @desc:
 */

export const BaseRouter : any [] = [
  {
    path: '/Home',
    name: 'Home',
    component: ()=> import('../views/Home.vue')
  }
];

