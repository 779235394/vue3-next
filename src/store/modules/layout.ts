/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-27 15:00:57
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-05-07 15:45:24
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
      opened: Number(window.localStorage.getItem('sidebarStatus')),
      withoutAnimation: false,
    },
  },
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      state.sidebar.opened = state.sidebar.opened?0:1
      state.sidebar.withoutAnimation = false
      window.localStorage.setItem('sidebarStatus', state.sidebar.opened)
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      window.localStorage.setItem('sidebarStatus', '0')
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
  },
  getters: {
    sidebar: (state) => state.sidebar,
  },
}
