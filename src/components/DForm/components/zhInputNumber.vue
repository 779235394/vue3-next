<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-25 15:32:38
-->
<template>
  <el-input-number
      v-model="formData[item.prop]"
      :disabled="item.disabled"
      :controls-position="item.controlsPosition"
      style="width: 100%"
      :style="item.style"
      :class="item.class"
      :min="item.min"
      :max="item.max"
      :step="item.step"
      :step-strictly="item.stepStrictly"
      :precision="item.precision"
      :controls="item.controls"
      :placeholder="item.placeholder"
      @change="change"
      @blur="blur"
      @focus="focus">
  </el-input-number>
</template>

<script setup lang="ts">

const emits = defineEmits(['event'])
const { item, formData } = defineProps({
  item: { type: Object, default: () => {} },
  formData: { type: Object, default: () => {} },
})
onBeforeMount(() => {
  if (!formData[item.prop]) {
    formData[item.prop] = 1
  }
})
const change = () => {
  emits('event', {
    type: 'change',
    prop: item.prop,
    value: formData[item.prop],
  })
}
const focus = () => {
  emits('event', {
    type: 'focus',
    prop: item.prop,
    value: formData[item.prop],
  })
}
const blur = () => {
  emits('event', {
    type: 'blur',
    prop: item.prop,
    value: formData[item.prop],
  })
}

</script>

<style scoped>

</style>
