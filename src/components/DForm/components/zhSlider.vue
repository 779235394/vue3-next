<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-07-09 11:37:34
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

<script lang="ts">
export default {
  name: 'ZhSlider',
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
