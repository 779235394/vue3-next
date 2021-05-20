<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-26 10:33:52
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-05-07 15:34:19
-->
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
import { defineComponent, onMounted, toRefs, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import sidebarItem from './sidebarItem.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Home',
  components: {
    sidebarItem,
  },
  setup: () => {
    const state = reactive({})
    const store = useStore()
    const router = useRouter()
    const activeMenu = computed(() => {
      return router.currentRoute.value.path
    })
    const permission_routes = computed(() => {
      const routeList: any = []
      router.options.routes.forEach((item: any) => {
        if (item.path == '/') routeList.push(...item.children)
      })
      console.log(routeList)
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
      ...toRefs(state),
    }
  },
})
</script>

<style lang='scss' scoped>
</style>
