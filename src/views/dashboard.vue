<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2022-02-09 15:37:04
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-25 15:32:07
-->
/**
* @Author: junlan.he
* @date: 2021/4/23
* @desc:
*/
<template>
  <div>首页</div>
</template>

<script lang="ts">

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
