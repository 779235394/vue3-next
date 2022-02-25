<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2022-01-14 14:07:02
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-09 15:00:26
-->
<template>
    <router-view v-slot="{ Component }">
      <!-- 开启缓存对应路由添加keepAlive:true 对应页面添加name -->
      <keep-alive :include="cachedViews">
        <component :is="Component"/>
      </keep-alive>
    </router-view>
</template>

<script setup lang="ts">

const store = useStore()
const cachedViews = computed(() => {
  return store.state.tagViews.cachedViews
})
</script>

<style lang='scss' scoped>
</style>
