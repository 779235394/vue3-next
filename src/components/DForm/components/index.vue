<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-01-27 16:06:29
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
import zhButton from './zhButton.vue'
import zhInput from './zhInput.vue'
import zhRadio from './zhRadio.vue'
import zhRadioButton from './zhRadioButton.vue'
import zhCheck from './zhCheck.vue'
import zhCheckButton from './zhCheckButton.vue'
import zhDatePicker from './zhDatePicker.vue'
import zhInputNumber from './zhInputNumber.vue'
import zhSelect from './zhSelect.vue'
import zhSlider from './zhSlider.vue'
import zhSpan from './zhSpan.vue'
import zhIcon from './zhIcon.vue'
import zhColorPicker from './zhColorPicker.vue'
import zhRate from './zhRate.vue'
import zhTimePicker from './zhTimePicker.vue'
import zhTag from './zhTag.vue'
import zhSwitch from './zhSwitch.vue'
import zhCascader from './zhCascader.vue'

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
