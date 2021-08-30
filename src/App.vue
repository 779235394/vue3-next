<template>
  <el-config-provider :locale="locale">
    <RouterView/>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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
