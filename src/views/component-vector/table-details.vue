<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-07-09 10:58:02
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-25 14:37:59
-->
<template>
  table表详情页
  <el-button @click='goBack'>返回</el-button>
</template>

<script setup lang="ts">

const router = useRouter()
const route = useRoute()
const store= useStore()
const goBack= () => {
  router.push({ path: '/dynamic-table' })
  store.dispatch('tagViews/delView', route)
}
</script>

<style scoped>

</style>
