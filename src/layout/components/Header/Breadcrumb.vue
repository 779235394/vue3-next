<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2022-02-09 15:37:04
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-25 15:30:24
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { onBeforeRouteUpdate } from 'vue-router'

export default defineComponent({
  name: 'Breadcrumb',
  setup: () => {
    const state = reactive({
      levelList: null,
    })
    onBeforeRouteUpdate((to) => {
      if (to.path.startsWith('/redirect/')) {
        return
      }
      getBreadcrumb(to)
    })
    onMounted(() => {
      getBreadcrumb(router.currentRoute.value)
    })
    const router = useRouter()
    const getBreadcrumb = (route) => {
      // only show routes with meta.title
      let matched = route.matched.filter((item) => item.meta && item.meta.title)
      const first = matched[0]
      if (!isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
      }

      state.levelList = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }
    const isDashboard = (route) => {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    }
    const handleLink = (item) => {
      const { redirect, path } = item
      if (redirect) {
        router.push(redirect)
        return
      }
      router.push(path)
    }
    return {
      ...toRefs(state),
      handleLink,
    }
  },
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
