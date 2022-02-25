<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-25 15:27:02
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
import zhButton from './components/zhButton.vue'
import zhInput from './components/zhInput.vue'
import zhRadio from './components/zhRadio.vue'
import zhRadioButton from './components/zhRadioButton.vue'
import zhCheck from './components/zhCheck.vue'
import zhCheckButton from './components/zhCheckButton.vue'
import zhDatePicker from './components/zhDatePicker.vue'
import zhInputNumber from './components/zhInputNumber.vue'
import zhSelect from './components/zhSelect.vue'
import zhSlider from './components/zhSlider.vue'
import zhSpan from './components/zhSpan.vue'
import zhIcon from './components/zhIcon.vue'
import zhColorPicker from './components/zhColorPicker.vue'
import zhRate from './components/zhRate.vue'
import zhTimePicker from './components/zhTimePicker.vue'
import zhTag from './components/zhTag.vue'
import zhSwitch from './components/zhSwitch.vue'
import zhCascader from './components/zhCascader.vue'

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
