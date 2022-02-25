<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-25 15:31:47
-->
<template>
  <el-radio-group
      v-model="formData[item.prop]"
      :size="item.size"
      @change="change">
    <el-radio
        v-for="option in options"
        :key="option.value?option.value:option"
        :label="option.value?option.value:option"
        :border="item.border"
        :style="item.style"
        :disabled="item.disabled">
      {{ option.label ? option.label : option }}
    </el-radio>
  </el-radio-group>
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
