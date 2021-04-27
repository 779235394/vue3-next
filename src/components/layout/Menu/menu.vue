<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-26 10:33:52
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-04-27 10:54:41
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
      isCollapse: false,
    })
    const router = useRouter()
    const activeMenu = computed(() => { return router.currentRoute.value.path })
    const permission_routes = computed(() => {
      console.log(router.options.routes)
      const routeList:any = []
      router.options.routes.forEach((item) => {
        if (item.path == '/') routeList.push(item.children)
      })
      console.log(routeList)
      return routeList[0]
    })
    onMounted(() => {
      console.log(permission_routes)
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

<style lang="scss" scoped>
.el-menu {
  width: 100%;
}
</style>
