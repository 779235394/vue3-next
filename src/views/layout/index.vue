<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-26 10:21:18
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-04-27 16:57:40
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
import { defineComponent, onMounted, toRefs } from 'vue'
import Menu from '@/components/layout/Menu/menu.vue'
import Header from '@/components/layout/Header/index.vue'
import { state, classObj } from './index.ts'

export default defineComponent({
  name: 'Home',
  components: {
    Menu,
    Header,
  },
  setup: () => {
    onMounted(() => {
      console.log(state.text)
    })
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
