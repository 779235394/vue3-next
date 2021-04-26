/**
 * @Author: junlan.he
 * @date: 2021/4/14
 * @desc:
 */
import { createStore } from 'vuex'
import textModules from './modules/test'

export const store = createStore({
  modules: {
    textModules,
  },
})
