<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-26 10:33:52
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-04-26 15:43:40
-->
<template>
    <el-menu
    :default-active="activeMenu"
    :collapse="isCollapse"
    :unique-opened="false"
    :collapse-transition="false"
    mode="vertical"
    >
        <sidebar-item
            v-for="route in permission_routes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
        />
    </el-menu>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import sidebarItem from './sidebarItem.vue'
export default defineComponent({
  name: 'Home',
  components: {
    sidebarItem,
  },
  setup: () => {
    const state = reactive({
      isCollapse: true,
      permission_routes: {},
    })
    const router = useRouter()
    const activeMenu = computed(() => router.currentRoute.value.path)
    onMounted(() => {
      console.log(router.currentRoute.value.path)
    })
    return {
      router,
      activeMenu,
      ...toRefs(state),
    }
  },
})
</script>
