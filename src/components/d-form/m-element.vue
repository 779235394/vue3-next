<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-04-13 10:52:45
-->
<template>
  <component
      :is="isCom[`zh${item.eType}`]"
      :item="item"
      :form-data="formData"
      @event="event">
  </component>
</template>

<script setup lang="ts">
import zhButton from './components/zh-button.vue'
import zhInput from './components/zh-input.vue'
import zhRadio from './components/zh-radio.vue'
import zhRadioButton from './components/zh-radio-button.vue'
import zhCheck from './components/zh-check.vue'
import zhCheckButton from './components/zh-check-button.vue'
import zhDatePicker from './components/zh-date-picker.vue'
import zhInputNumber from './components/zh-input-number.vue'
import zhSelect from './components/zh-select.vue'
import zhSlider from './components/zh-slider.vue'
import zhSpan from './components/zh-span.vue'
import zhIcon from './components/zh-icon.vue'
import zhColorPicker from './components/zh-color-picker.vue'
import zhRate from './components/zh-rate.vue'
import zhTimePicker from './components/zh-time-picker.vue'
import zhTag from './components/zh-tag.vue'
import zhSwitch from './components/zh-switch.vue'
import zhCascader from './components/zh-cascader.vue'

const emits = defineEmits(['event'])
const { item, formData } = defineProps(['item', 'formData'])
const isCom = {
  zhButton,
  zhInput,
  zhRadio,
  zhRadioButton,
  zhCheck,
  zhCheckButton,
  zhDatePicker,
  zhInputNumber,
  zhSelect,
  zhSlider,
  zhSpan,
  zhIcon,
  zhColorPicker,
  zhRate,
  zhTimePicker,
  zhTag,
  zhSwitch,
  zhCascader,
}
const event = (params: any) => {
  emits('event', { ...params, data: formData })
}

</script>

<style scoped>

</style>
