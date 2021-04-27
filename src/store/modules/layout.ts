/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-27 15:00:57
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-04-27 15:27:49
 */
/**
 * @Author: junlan.he
 * @date: 2021/4/14
 * @desc:
 */
export default {
  namespaced: true,
  state: {
    sidebar: {
      opened: window.localStorage.getItem('sidebarStatus'),
      withoutAnimation: false,
    },
  },
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        window.localStorage.setItem('sidebarStatus', '1')
      } else {
        window.localStorage.setItem('sidebarStatus', '0')
      }
    },
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
  },
  getters: {
    sidebar: (state) => state.sidebar,
  },
}
