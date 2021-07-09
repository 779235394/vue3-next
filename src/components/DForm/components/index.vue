<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-07-09 15:18:59
-->
<template>
  <component
      :is="`zh${item.eType}`"
      :item="item"
      :form-data="formData"
      @event="event">
  </component>
</template>

<script lang="ts">
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

export default {
  name: 'Index',
  components: {
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
  },
  emits: ['event'],
  props: {
    item: {},
    formData: {},
  },
  setup(props, content) {
    const event = (params: any) => {
      content.emit('event', { ...params, data: props.formData })
    }
    return {
      event,
    }
  },

}
</script>

<style scoped>

</style>
