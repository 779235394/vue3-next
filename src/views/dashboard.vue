/**
* @Author: junlan.he
* @date: 2021/4/23
* @desc:
*/
<template>
  <div>首页</div>
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
