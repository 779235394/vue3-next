<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-03-11 10:23:07
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
import { designerText } from '../../designerText'
import inputWidget from './inputWidget.vue'
import textareaWidget from './textareaWidget.vue'
import numberWidget from './numberWidget.vue'
import radioWidget from './radioWidget.vue'
import checkboxWidget from './checkboxWidget.vue'
import selectWidget from './selectWidget.vue'
import timeWidget from './timeWidget.vue'
import timeRangeWidget from './timeRangeWidget.vue'
import dateWidget from './dateWidget.vue'
import dateRangeWidget from './dateRangeWidget.vue'
import switchWidget from './switchWidget.vue'
import rateWidget from './rateWidget.vue'
import colorWidget from './colorWidget.vue'
import sliderWidget from './sliderWidget.vue'
import staticTextWidget from './staticTextWidget.vue'
import htmlTextWidget from './htmlTextWidget.vue'
import buttonWidget from './buttonWidget.vue'
import dividerWidget from './dividerWidget.vue'
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
