/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-25 10:48:20
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-25 15:41:08
 */
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
