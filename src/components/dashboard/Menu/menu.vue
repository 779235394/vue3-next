<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-26 10:33:52
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-04-26 16:20:31
-->
<template>
    <el-menu
    :default-active="activeMenu"
    :collapse="isCollapse"
    :unique-opened="false"
    :collapse-transition="false"
    mode="vertical"
    >
        <sidebar-item
            v-for="route in permission_routes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
        />
    </el-menu>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import sidebarItem from './sidebarItem.vue'
export default defineComponent({
  name: 'Home',
  components: {
    sidebarItem,
  },
  setup: () => {
    const state = reactive({
      isCollapse: true,
    })
    const router = useRouter()
    const activeMenu = computed(() => { return router.currentRoute.value.path })
    const permission_routes = computed(() => {
      return router.options.routes
    })
    onMounted(() => {
      console.log(router.currentRoute.value.path)
    })
    return {
      router,
      activeMenu,
      permission_routes,
      ...toRefs(state),
    }
  },
})
</script>
