/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-25 10:48:20
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-04-27 15:07:07
 */
import { createStore } from 'vuex'
import textModules from './modules/test'
import layout from './modules/layout'
import tagViews from './modules/tagViews'
export const store = createStore({
  modules: {
    textModules,
    layout,
    tagViews,
  },
})
