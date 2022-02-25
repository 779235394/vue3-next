<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2022-02-09 15:37:04
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-25 15:31:34
-->
<template>
  <el-config-provider :locale="locale">
    <RouterView/>
  </el-config-provider>
</template>

<script lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  name: 'App',
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  setup: function() {
    const locale = ref(zhCn)
    return {
      locale,
    }
  },
})
</script>
