<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-26 10:21:18
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-04-26 16:08:03
-->
<template>
  <el-container class="app-wrapper">
    <el-aside width="200px">
      <Menu></Menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs } from 'vue'
import Menu from '@/components/layout/Menu/menu.vue'
import { state } from './index.ts'

export default defineComponent({
  name: 'Home',
  components: {
    Menu,
  },
  setup: () => {
    onMounted(() => {
      console.log(state.text)
    })
    return {
      ...toRefs(state),
    }
  },
})
</script>

<style lang="sass">
  @import './index.scss'
</style>
