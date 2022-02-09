<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-08 11:00:07
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

<script setup lang="ts">
const emits = defineEmits(['event'])

const { item, formData } = defineProps({
  item: { type: Object, default: () => {} },
  formData: { type: Object, default: () => {} },
})

const change = () => {
  emits('event', {
    type: 'change',
    prop: item.prop,
    value: formData[item.prop],
  })
}
</script>

<style scoped>

</style>
