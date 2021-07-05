<template>
  <div
    id='tags-view-container'
    class='tags-view-container'
  >
    <ScrollPane
      ref='scrollPaneRef'
      class='tags-view-wrapper'
    >
      <router-link
        v-for='tag in visitedViews'
        ref='tag'
        :key='tag.path'
        :class="isActive(tag) ? 'active' : ''"
        :to='{path: tag.path, query: tag.query, fullPath: tag.fullPath}'
        tag='span'
        class='tags-view-item'
        @click.middle="!isAffix(tag)?closeSelectedTag(tag):''"

      >
        {{ tag.meta.title }}
        <span
          v-if="!isAffix(tag) && tag.name !== 'Dashboard'"
          class='el-icon-close'
          @click.prevent.stop='closeSelectedTag(tag)'
        />
      </router-link>
    </ScrollPane>
    <div class='tags-close-box'>
      <el-dropdown @command="handleTags">
        <el-button size='mini' type='primary'>
          标签选项
          <i class='el-icon-arrow-down el-icon--right'></i>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu size='small'>
            <el-dropdown-item command="now" v-if='selectedTag.name !=="Dashboard" '>关闭当前</el-dropdown-item>
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang='ts'>
import { useStore } from 'vuex'
import {
  computed,
  defineComponent,
  onBeforeMount,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ScrollPane from './ScrollPane.vue'

export default defineComponent({
  components: {
    ScrollPane,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const currentRoute = useRoute()
    const scrollPaneRef = ref(null)

    const toLastView = (visitedViews, view) => {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView !== undefined && latestView.fullPath !== undefined) {
        router.push(latestView.fullPath).catch((err) => {
          console.warn(err)
        })
      } else {
        if (view.name === 'Dashboard') {
          router.push({ path: view.fullPath }).catch((err) => {
            console.warn(err)
          })
        } else {
          router.push('/').catch((err) => {
            console.warn(err)
          })
        }
      }
    }

    const state = reactive({
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {
        fullPath: '',
        path: '',
        name: '',
        meta: {},
      },
      affixTags: [],
      isActive: (route) => {
        return route.path === currentRoute.path
      },
      isAffix: (tag) => {
        return tag.meta && tag.meta.affix
      },
      closeSelectedTag: (view) => {
        if (view.name === 'Dashboard') return
        store.dispatch('tagViews/ACTION_DEL_VIEW', view)
        if (state.isActive(view)) {
          toLastView(store.state.tagViews.visitedViews, view)
        }
      },
      closeSelectedOtherTag: (view) => {
        if (view.fullPath !== currentRoute.path && view.fullPath !== undefined) {
          router.push(view.fullPath).catch((err) => {
            console.log(err)
          })
        }
        store.dispatch('tagViews/ACTION_DEL_OTHER_VIEW', view )
      },
      closeSelectedAllTag: () => {
        store.dispatch('tagViews/ACTION_DEL_ALL_VIEWS', undefined)
        if (state.affixTags.some((tag) => tag.path === currentRoute.path)) {
          return
        }
        toLastView(store.state.tagViews.visitedViews, state.selectedTag)
      },
      handleTags: (command) => {
        switch (command) {
          case 'now':
            state.closeSelectedTag(state.selectedTag)
            break
          case 'other':
            state.closeSelectedOtherTag(state.selectedTag)
            break
          case 'all':
            state.closeSelectedAllTag()
            break
        }
      },
    })

    const visitedViews = computed(() => {
      return store.state.tagViews.visitedViews
    })
    const filterAffixTags = (routes) => {
      let tags: any = []

      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = route.path
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
          })
        }

        if (route.children) {
          const childTags = filterAffixTags(route.children, route.path)
          if (childTags.length >= 1) {
            tags = tags.concat(childTags)
          }
        }
      })
      return tags
    }

    const initTags = () => {
      state.affixTags = filterAffixTags(router.options.routes)

      for (const tag of state.affixTags) {
        if (tag.name) {
          store.dispatch('tagViews/ACTION_ADD_VISITED_VIEW', tag)
        }
      }
    }

    const addTags = () => {
      if (currentRoute.name) {
        store.dispatch('tagViews/ACTION_ADD_VIEW', currentRoute)
      }
      state.selectedTag = currentRoute
      return false
    }

    watch(() => currentRoute.name, () => {
      if (currentRoute.name !== 'login') {
        addTags()
      }
    })

    // life cricle
    onBeforeMount(() => {
      initTags()
      addTags()
    })

    return {
      visitedViews,
      scrollPaneRef,
      ...toRefs(state),
    }
  },
})
</script>

<style lang='scss' scoped>

  // Reset element css of el-icon-close
  .tags-view-wrapper {
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;

        &:before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -3px;
        }

        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
</style>
<style lang='scss' scoped>
  .tags-close-box {
    box-sizing: border-box;
    margin-top: 3px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    z-index: 10;
    margin-right: 5px;
  }

  .tags-view-container {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-direction: row;

    .tags-view-wrapper {
      position: relative;

      .tags-view-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 26px;
        line-height: 25px;
        border: 1px solid rgba(124, 141, 181, .3);
        border-radius: 4px;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;
        box-sizing: border-box;

        &:first-of-type {
          margin-left: 15px;
        }

        &:last-of-type {
          margin-right: 15px;
        }

        &.active {
          background-color: #5DDAB4;
          color: #fff;
        }
      }
    }

    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 3000;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;

      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;

        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>
