<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-04-13 10:38:03
-->
<template>
  <template v-if="'container' === element.category">
    <component
      :is="getWidgetName(element)"
      :designerText="designerText"
      :widget="element"
      :designer="designer"
      :key="element.id"
      :parent-list="designer.widgetList"
      :index-of-parent-list="zhIndex"
      :parent-widget="null"
    ></component>
  </template>
  <template v-else>
    <component
      :is="getWidgetName(element)"
      :designerText="designerText"
      :field="element"
      :designer="designer"
      :key="element.id"
      :parent-list="designer.widgetList"
      :index-of-parent-list="zhIndex"
      :parent-widget="null"
      :design-state="true"
    ></component>
  </template>
</template>

<script setup lang="ts">
import { designerText } from '../../designer-text'
import inputWidget from './input-widget.vue'
import textareaWidget from './textarea-widget.vue'
import numberWidget from './number-widget.vue'
import radioWidget from './radio-widget.vue'
import checkboxWidget from './checkbox-widget.vue'
import selectWidget from './select-widget.vue'
import timeWidget from './time-widget.vue'
import timeRangeWidget from './time-range-widget.vue'
import dateWidget from './date-widget.vue'
import dateRangeWidget from './date-range-widget.vue'
import switchWidget from './switch-widget.vue'
import rateWidget from './rate-widget.vue'
import colorWidget from './color-widget.vue'
import sliderWidget from './slider-widget.vue'
import staticTextWidget from './static-text-widget.vue'
import htmlTextWidget from './html-text-widget.vue'
import buttonWidget from './button-widget.vue'
import dividerWidget from './divider-widget.vue'
const isCom = {
  inputWidget,
  textareaWidget,
  numberWidget,
  radioWidget,
  checkboxWidget,
  selectWidget,
  timeWidget,
  timeRangeWidget,
  dateWidget,
  dateRangeWidget,
  switchWidget,
  rateWidget,
  colorWidget,
  sliderWidget,
  staticTextWidget,
  htmlTextWidget,
  buttonWidget,
  dividerWidget,
}

const { element, zhIndex } = defineProps(['element', 'zhIndex', 'designer', 'designerText'])

const getWidgetName = (widget) => {
  return isCom[widget.type + 'Widget']
}

</script>

<style scoped>

</style>
