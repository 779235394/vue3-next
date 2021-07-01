/**
 * @Author: junlan.he
 * @date: 2021/7/1
 * @desc:
 */
export default {
  namespaced: true,
  state: {
    visitedViews: [],
  },
  mutations: {
    ADD_VISITED_VIEW(state, view) {
      if (state.visitedViews.some((v) => v.path === view.path)) return
      state.visitedViews.push(
          Object.assign({}, view, {
            title: view.meta?.title || 'no-name',
          }),
      )
    },
    DEL_VISITED_VIEW(state, view) {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
    },
    DEL_OTHERS_VISITED_VIEWS(state, view) {
      state.visitedViews = state.visitedViews.filter((v) => {
        return v.meta?.affix || v.path === view.path
      })
    },
    DEL_ALL_VISITED_VIEWS(state) {
      // keep affix tags
      const affixTags = state.visitedViews.filter((tag) => tag.meta?.affix)
      state.visitedViews = affixTags
    },
    UPDATE_VISITED_VIEW(state, view) {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    },
  },
  actions: {
    ACTION_ADD_VIEW({ commit }, view) {
      commit('ADD_VISITED_VIEW', view)
    },
    ACTION_ADD_VISITED_VIEW({ commit }, view) {
      commit('ADD_VISITED_VIEW', view)
    },
    ACTION_DEL_VIEW({ commit }, view) {
      commit('DEL_VISITED_VIEW', view)
    },
    ACTION_DEL_OTHER_VIEW({ commit }, view) {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
    },
    ACTION_OTHER_VIEWS({ commit }, view) {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
    },
    ACTION_DEL_ALL_VIEWS({ commit }) {
      commit('DEL_ALL_VISITED_VIEWS')
    },
    ACTION_UPDATE_VISITED_VIEW({ commit }, view) {
      commit('UPDATE_VISITED_VIEW', view)
    },
  },
}
