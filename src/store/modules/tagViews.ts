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
    add_visited_view(state, view) {
      if (state.visitedViews.some((v) => v.path === view.path)) return
      state.visitedViews.push(
          Object.assign({}, view, {
            title: view.meta?.title || 'no-name',
          }),
      )
    },
    del_visited_view(state, view) {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
    },
    del_others_visited_views(state, view) {
      state.visitedViews = state.visitedViews.filter((v) => {
        return v.meta?.affix || v.path === view.path
      })
    },
    del_all_visited_views(state) {
      // keep affix tags
      const affixTags = state.visitedViews.filter((tag) => tag.meta?.affix)
      state.visitedViews = affixTags
    },
    update_visited_view(state, view) {
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
      commit('add_visited_view', view)
    },
    ACTION_ADD_VISITED_VIEW({ commit }, view) {
      commit('add_visited_view', view)
    },
    ACTION_DEL_VIEW({ commit }, view) {
      commit('del_visited_view', view)
    },
    ACTION_DEL_OTHER_VIEW({ commit }, view) {
      commit('del_others_visited_views', view)
    },
    ACTION_OTHER_VIEWS({ commit }, view) {
      commit('del_others_visited_views', view)
    },
    ACTION_DEL_ALL_VIEWS({ commit }) {
      commit('del_all_visited_views')
    },
    ACTION_UPDATE_VISITED_VIEW({ commit }, view) {
      commit('update_visited_view', view)
    },
  },
}
