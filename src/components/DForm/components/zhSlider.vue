<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-08 10:57:01
-->
<template>
  <el-slider
      v-model="formData[item.prop]"
      :min="item.min"
      :max="item.max"
      :step="item.step"
      :disabled="item.disabled"
      :show-input="item.showInput"
      :show-input-controls="item.showInputControls"
      :show-stops="item.showStops"
      :show-tooltip="item.showTooltip"
      :range="item.range"
      :height="item.height"
      :vertical="item.vertical"
      :marks="item.marks"
      @change="change">
  </el-slider>
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
