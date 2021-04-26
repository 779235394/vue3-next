/**
 * @Author: junlan.he
 * @date: 2021/4/14
 * @desc:
 */
export default {
  namespaced: true,
  state: {
    count: 10,
  },
  mutations: {
    SET_COUNT(state: any) {
      state.count++
    },
  },
  actions: {
    set_count(ctx: any) {
      ctx.commit('SET_COUNT')
    },
  },
}
