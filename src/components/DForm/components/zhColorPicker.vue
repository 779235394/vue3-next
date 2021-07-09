<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-07-09 15:20:06
-->
<template>
  <el-color-picker
      v-model="formData[item.prop]"
      :disabled="item.disabled"
      :size="item.size"
      :color-format="item.colorFormat"
      :predefine="item.predefine"
      :show-alpha="item.showAlpha"
      @change="change">
  </el-color-picker>
</template>

<script lang="ts">
export default {
  name: 'ZhColorPicker',
  emits: ['event'],
  props: {
    item: { type: Object, default: () => {} },
    formData: { type: Object, default: () => {} },
  },
  setup(prop, context) {
    const change = () => {
      context.emit('event', {
        type: 'change',
        prop: prop.item.prop,
        value: prop.formData[prop.item.prop],
      })
    }
    return {
      change,
    }
  },
}
</script>

<style scoped>

</style>
