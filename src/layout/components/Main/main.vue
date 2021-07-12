<!--
 * @Descripttion:
 * @Author: hejunlan
 * @Date: 2021-07-09 10:43:04
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-07-12 17:18:18
-->
<template>
    <router-view v-slot="{ Component }">
      <!-- 开启缓存对应路由添加keepAlive:true 对应页面添加name -->
      <keep-alive :include="cachedViews">
        <component :is="Component"/>
      </keep-alive>
    </router-view>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Main',
  setup() {
    const store = useStore()
    const cachedViews = computed(() => {
      console.log(store.state.tagViews.cachedViews)
      return store.state.tagViews.cachedViews
    })
    return {
      cachedViews,
    }
  },
})
</script>

<style lang='scss' scoped>
</style>
