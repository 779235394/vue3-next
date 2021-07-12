<!--
 * @Descripttion:
 * @Author: hejunlan
 * @Date: 2021-07-09 10:43:04
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-07-12 16:15:42
-->
<template>
    <router-view v-slot="{ Component, route }">
      <keep-alive :max="10">
        <component :is="Component" :key="route.name" v-if="route.meta.keepAlive"/>
      </keep-alive>
      <component :is="Component" :key="route.name" v-if="!route.meta.keepAlive"/>
    </router-view>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Main',
})
</script>

<style lang='scss' scoped>

</style>
