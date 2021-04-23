/**
 * @Author: junlan.he
 * @date: 2021/4/23
 * @desc:
 */
import {createRouter, createWebHistory} from 'vue-router';

const router =createRouter({
  history: createWebHistory(),
  strict: true,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ()=> import('../views/Home.vue')
    },
    {
      path: '/Text',
      name: 'Text',
      component: ()=> import('../views/Text.vue')
    }
  ]
});

export default router;
