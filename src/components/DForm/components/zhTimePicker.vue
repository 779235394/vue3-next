<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-07-09 11:36:52
-->

<template>
  <el-time-picker
      style="width:100%"
      v-model="formData[item.prop]"
      :is-range="item.isRange"
      :clearable="item.clearable"
      :placeholder="item.placeholder"
      :editable="item.editable"
      :arrow-control="item.arrowControl"
      :disabled="item.disabled"
      :range-separator="item.rangeSeparator"
      :start-placeholder="item.startPlaceholder?item.startPlaceholder:'开始日期'"
      :end-placeholder="item.endPlaceholder?item.endPlaceholder:'结束日期'"
      @change="change">
  </el-time-picker>
</template>

<script lang="ts">
export default {
  name: 'ZhTimePicker',
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
