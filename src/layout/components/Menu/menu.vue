<template>
  <el-menu
    :default-active='activeMenu'
    :collapse='isCollapse'
    :unique-opened='false'
    :collapse-transition='false'
    mode='vertical'
    text-color='#fff'
    background-color='#515a6e'
    active-text-color='#ffd04b'>
    <sidebar-item v-for='route in permission_routes' :key='route.path' :item='route' :base-path='route.path' />
  </el-menu>
</template>

<script lang='ts'>
import { defineComponent, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import sidebarItem from './sidebarItem.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Home',
  components: {
    sidebarItem,
  },
  setup: () => {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
      // console.log(router.currentRoute.value.meta)
      // return router.currentRoute.value.meta.isDetails? router.currentRoute.value.meta.activeMenu : router.currentRoute.value.path
    })
    const permission_routes = computed(() => {
      const routeList: any = []
      router.options.routes.forEach((item: any) => {
        if (item.path == '/') routeList.push(...item.children)
      })
      return routeList
    })
    const isCollapse = computed(() => !store.getters['layout/sidebar'].opened)
    onMounted(() => {
    })
    return {
      router,
      activeMenu,
      permission_routes,
      isCollapse,
    }
  },
})
</script>

<style lang='scss' scoped>
</style>
