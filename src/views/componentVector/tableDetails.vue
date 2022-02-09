<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-07-09 10:58:02
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-01-27 15:27:21
-->
<template>
  table表详情页
  <el-button @click='goBack'>返回</el-button>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const route = useRoute()
const store= useStore()
const goBack= () => {
  router.push({ path: '/dynamicTable' })
  store.dispatch('tagViews/delView', route)
}
</script>

<style scoped>

</style>
