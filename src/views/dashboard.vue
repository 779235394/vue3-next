/**
* @Author: junlan.he
* @date: 2021/4/23
* @desc:
*/
<template>
  <div>aaaa</div>
  <el-button type="success" @click="router.go(-1)">路由跳转</el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Dashboard',

  setup: () => {
    const router = useRouter()
    return {
      router,
    }
  },

})
</script>

<style scoped>

</style>
