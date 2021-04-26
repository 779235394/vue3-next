<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-26 15:17:30
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-04-26 16:38:14
-->
<template>
    <div v-if="!item.hidden">
        <el-submenu
            ref="subMenu"
            :index="resolvePath(item.path)"
            popper-append-to-body
        >
            <template #title>
                <item
                    v-if="item.meta"
                    :icon="item.meta && item.meta.icon"
                    :title="item.meta.title"
                />

            </template>
            <sidebar-item
                v-for="child in item.children"
                :key="child.path"
                :is-nest="true"
                :item="child"
                :base-path="resolvePath(child.path)"
                class="nest-menu"
            />
        </el-submenu>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    /**
     * @param {routePath} routePath
     * @return {resolvePath}
     */
    function resolvePath(routePath) {
      return routePath
    }
    return {
      resolvePath,
    }
  },
})
</script>
