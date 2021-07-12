<!--
 * @Descripttion:
 * @Author: junlan.he
 * @Date: 2021-07-09 10:58:02
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-07-12 17:19:06
-->
<template>
  table表详情页
  <el-button @click='goBack'>返回</el-button>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({

  setup() {
    const router = useRouter()
    const route = useRoute()
    const store= useStore()
    const state = reactive({
      goBack: () => {
        router.push({ path: '/dynamicTable' })
        store.dispatch('tagViews/delView', route)
      },
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>

<style scoped>

</style>
