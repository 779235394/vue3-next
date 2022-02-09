<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-08 10:54:03
-->
<template>
  <el-select
      style="width: 100%"
      v-model="formData[item.prop]"
      :placeholder="item.placeholder?item.placeholder:'请选择'"
      :class="item.class"
      :style="item.value"
      :allow-create="item.allowCreate"
      :filterable="item.filterable"
      :clearable="item.clearable"
      :disabled="item.disabled"
      :multiple="item.multiple"
      :multiple-limit="item.multipleLimit"
      @change="change">
    <el-option
        v-for="option in options"
        :key="option.value?option.value:option"
        :label="option.label?option.label:option"
        :value="option.value?option.value:option"
        :disabled="option.disabled">
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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
const options = computed(() => {
  if (item.options instanceof Array) {
    return item.options
  } else {
    const list = item.options.split(',')
    return list.map((item) => {
      return { value: item, label: item }
    })
  }
})
</script>

<style scoped>

</style>
