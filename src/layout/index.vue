<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-26 10:21:18
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-04-11 11:15:41
-->
<template>
  <el-container :class='classObj' class='app-wrapper'>
    <el-aside :width='sidebar.opened?"200px":"54px"' style='background: #515a6e'>
      <Menu></Menu>
    </el-aside>
    <el-container class='main-box'>
      <el-header>
        <Header></Header>
        <TagsView />
      </el-header>
      <el-main class="layout-main">
        <Main></Main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang='ts'>
import Menu from '@/layout/components/Menu/menu.vue'
import Header from '@/layout/components/Header/index.vue'

import Main from '@/layout/components/Main/main.vue'
import TagsView from '@/layout/components/TagsView/tagsview.vue'
const store = useStore()
const sidebar:any = store.getters['layout/sidebar']
const classObj = computed(() => {
  console.log(sidebar.value)
  return {
    hideSidebar: !sidebar.opened,
    openSidebar: sidebar.opened,
    withoutAnimation: sidebar.withoutAnimation,
  }
})
</script>

<style lang='scss' scoped>
  @import 'index';

  .main-box {
    ::v-deep(.el-header) {
      height: auto !important;
    }

    ::v-deep(.layout-main) {
      padding: 20px !important;
      height: 100%;
      border: 1px solid #ffffff;
      background: #fff;
      margin: 10px;
      box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
      box-sizing: border-box;
      border-radius: 5px;
    }
  }
</style>
