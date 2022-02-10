<!--
 * @Descripttion: 
 * @Author: huangzihong
 * @Date: 2022-02-09 15:37:04
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-10 17:53:51
-->
<p align="center">
  <a href="https://github.com/779235394/vue3-next" target="_blank">
    <img width="180" src="https://github.com/rcyj-FED/vue3-composition-admin-docs/blob/main/docs/.vuepress/public/icons/android-chrome-192x192.png" alt="logo">
  </a>
</p>


<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-3.0-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/element-plus/element-plus">
    <img src="https://img.shields.io/badge/element--plus-1.x-blue" alt="element-plus">
  </a>
  <a href="https://github.com/vuejs/vuex">
    <img src="https://img.shields.io/badge/vuex-4.0-brightgreen" alt="vuex">
  </a>
   <a href="https://github.com/npm/npm">
    <img src="https://img.shields.io/badge/npm-6.1.8-blue" alt="npm">
   </a>
</p>


> vue3-next 是一个管理端模板解决方案，它是基于vue3,ts和element-plus，项目都是以composition api风格编写。

[预览地址](https://779235394.github.io/vue3-next/#/dashboard)


# Vue 3 + Typescript + Vite + Vuex4 + Element-Plus

This template should help get you started developing with Vue 3 and Typescript in Vite.

### 说明
```markdown
此模版采用 Vue 3 + Typescript + Vite + Vuex4 + Element-Plus 构建
```

### 注意事项
element-plus 图标无法显示时是资源包引用的问题，修改main.ts
```markdown
// import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/packages/theme-chalk/src/index.scss'
```

路由history模式，github站点部署不成功，还不知道为啥，用hash模式就可以 createWebHashHistory

路由使用缓存的方法，在路由meat添加keepAlive:true，并在对应页面添加name
如：
``` js
  // router/modules/componentVector.js
  {
    path: '/dynamicTable',
    name: 'DynamicTable',
    component: () => import('../../views/componentVector/dynamicTable.vue'),
    meta: { title: '动态表格', noCache: true, icon: 'Smoking', keepAlive: true },
  }

  // view/componentVector/dynamicTable
  export default defineComponent({
    // ...
    name: 'DynamicTable',
    // ...
  })
```

