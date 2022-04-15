<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-08 10:01:15
-->
<template>
  <el-date-picker
      style="width: 100%"
      v-model="formData[item.prop]"
      :disabled="item.disabled"
      :type="item.type"
      :editable="item.editable"
      :clearable="item.clearable"
      :format="item.format"
      :style="item.style"
      :class="item.class"
      :placeholder="item.placeholder"
      :default-value="item.defaultValue"
      :range-separator="item.rangeSeparator"
      :start-placeholder="item.startPlaceholder ? item.startPlaceholder : '开始日期'"
      :end-placeholder="item.endPlaceholder ? item.endPlaceholder : '结束日期'"
      @change="change">
  </el-date-picker>
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
