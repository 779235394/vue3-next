<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-26 10:21:18
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-05-07 15:39:17
-->
<template>
  <el-container :class='classObj' class='app-wrapper'>
    <el-aside width='200px' style='background: #515a6e'>
      <Menu></Menu>
    </el-aside>
    <el-container class='main-box'>
      <el-header>
        <Header></Header>
        <TagsView />
      </el-header>
      <el-main>
        <Main class='main'></Main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang='ts'>
import { defineComponent, onMounted, toRefs, reactive, computed } from 'vue'
import Menu from '@/layout/components/Menu/menu.vue'
import Header from '@/layout/components/Header/index.vue'
import { useStore } from 'vuex'
import Main from '@/layout/components/Main/main.vue'
import TagsView from '@/layout/components/TagsView/index.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Main,
    Menu,
    Header,
    TagsView,
  },
  setup: () => {
    const state: any = reactive({
      sidebar: {},
    })
    const store = useStore()
    state.sidebar = store.getters['layout/sidebar']
    const classObj = computed(() => {
      return {
        hideSidebar: !state.sidebar.opened,
        openSidebar: state.sidebar.opened,
        withoutAnimation: state.sidebar.withoutAnimation,
      }
    })

    onMounted(() => {
    })
    return {
      classObj,
      ...toRefs(state),
    }
  },
})
</script>

<style lang='scss' scoped>
  @import 'index';
</style>
