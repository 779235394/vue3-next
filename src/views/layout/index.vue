<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-26 10:21:18
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-04-27 17:15:49
-->
<template>
  <el-container :class="classObj"  class="app-wrapper">
    <el-aside width="200px">
      <Menu></Menu>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, reactive, computed } from 'vue'
import Menu from '@/components/layout/Menu/menu.vue'
import Header from '@/components/layout/Header/index.vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Home',
  components: {
    Menu,
    Header,
  },
  setup: () => {
    const state:any = reactive({
      sidebar: {},
    })
    const store = useStore()
    state.sidebar = store.state.layout.sidebar
    const classObj = computed(() => {
      return {
        hideSidebar: !state.sidebar.opened,
        openSidebar: state.sidebar.opened,
        withoutAnimation: state.sidebar.withoutAnimation,
      }
    })

    onMounted(() => {})
    return {
      classObj,
      ...toRefs(state),
    }
  },
})
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
