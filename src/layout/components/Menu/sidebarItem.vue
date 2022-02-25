<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-26 15:17:30
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-25 15:33:17
-->
<template>
  <div v-if="!item.hidden">
    <template
      v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow"
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <el-icon class="sub-el-icon">
            <component :is="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"></component>
          </el-icon>
          <template #title v-if="item.meta">
            <span>{{ onlyOneChild.meta.title }}</span>
          </template>
        </el-menu-item>
      </app-link>
    </template>
    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title v-if="item.meta">
        <el-icon class="sub-el-icon">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="item.path + '/' + child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(item.path + '/' + child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import { isExternal } from '@/utils/validate'
import AppLink from './Link.vue'
const { item, isNest, basePath } = defineProps({
  item: {
    type: Object,
    default: () => { },
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: '',
  },
})
const state:any = reactive({
  onlyOneChild: null,
})
const { onlyOneChild } = toRefs(state)
/**
 * @param {children} children
 * @param {parent} parent
 * @return {hasOneShowingChild}
 */
const hasOneShowingChild = (children = [], parent) => {
  console.log(children, parent)
  const showingChildren = children.filter((childrenItem: any) => {
    let bool = false
    if (childrenItem && childrenItem.hidden) {
      bool = false
    } else {
      // Temp set(will be used if only has one showing child)
      state.onlyOneChild = childrenItem
      bool = true
    }
    console.log('bool', bool)
    return bool
  })
  console.log(showingChildren.length)
  if (showingChildren.length === 1) {
    return true
  }
  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    state.onlyOneChild = { ...parent, noShowingChildren: true }
    return true
  }
  return false
}
/**
 * @param {routePat} routePath
 * @return {resolvePath}
 */
const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(basePath)) {
    return basePath
  }
  return routePath
}
</script>
