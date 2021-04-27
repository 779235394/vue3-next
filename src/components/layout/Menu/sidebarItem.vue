<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-26 15:17:30
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-04-27 10:46:22
-->
<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <template #title v-if="item.meta">
            <i :class="[item.meta.icon, 'sub-el-icon']" />
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template #title v-if="item.meta">
        <i :class="[item.meta.icon, 'sub-el-icon']" />
        <span>{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="item.path  + '/' +  child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(item.path + '/' + child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { isExternal } from '@/utils/validate'
import AppLink from './Link.vue'
export default defineComponent({
  name: 'SidebarItem',
  components: { AppLink },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const state = reactive({
      onlyOneChild: null,
    })
    /**
     * @param {children} children
     * @param {parent} parent
     * @return {hasOneShowingChild}
    */
    function hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((childrenItem:any) => {
        let bool = false
        if (childrenItem && childrenItem.hidden) {
          bool = false
        } else {
          // Temp set(will be used if only has one showing child)
          state.onlyOneChild = childrenItem
          bool = true
        }
        return bool
      })
      if (showingChildren.length === 1) {
        return true
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        state.onlyOneChild = { ...parent, noShowingChildren: true }
        console.log(state.onlyOneChild)
        return true
      }

      return false
    }
    /**
     * @param {routePat} routePath
     * @return {resolvePath}
    */
    function resolvePath(routePath) {
      console.log(routePath)
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath)) {
        return props.basePath
      }
      return routePath
    }
    onMounted(() => {
      console.log(props.item)
    })
    return {
      resolvePath,
      hasOneShowingChild,
      ...toRefs(state),
    }
  },
})
</script>
,,
