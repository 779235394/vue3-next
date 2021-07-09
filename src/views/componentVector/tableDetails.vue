/**
* @Author: junlan.he
* @date: 2021/7/9
* @desc:
*/
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
        store.dispatch('tagViews/ACTION_DEL_VIEW', route)
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
