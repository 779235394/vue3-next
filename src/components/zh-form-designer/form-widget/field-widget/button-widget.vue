<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2022-03-10 16:47:16
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-03-10 16:47:46
-->
<template>
  <static-content-wrapper
    :designer="designer"
    :field="field"
    :design-state="designState"
    :parent-widget="parentWidget"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :sub-form-row-index="subFormRowIndex"
    :sub-form-col-index="subFormColIndex"
    :sub-form-row-id="subFormRowId"
  >
    <el-button
      ref="fieldEditor"
      :type="field.options.type"
      :size="widgetSize"
      :plain="field.options.plain"
      :round="field.options.round"
      :circle="field.options.circle"
      :icon="field.options.icon"
      :disabled="field.options.disabled"
      @click="handleButtonWidgetClick"
    >{{ field.options.label }}</el-button>
  </static-content-wrapper>
</template>

<script setup lang="ts">
import fieldHock from './field-hock'
const { field, parentWidget, parentList, indexOfParentList, designer, designState, subFormRowIndex, subFormColIndex, subFormRowId } = defineProps({
  field: {
    default: () => {
      return {}
    },
    type: Object,
  },
  parentWidget: {
    type: Object,
  },
  parentList: {
    type: Array,
  },
  indexOfParentList: {
    type: Number,
  },
  designer: {
    type: Object,
  },
  designState: {
    type: Boolean,
    default: false,
  },
  subFormRowIndex: { /* 子表单组件行索引，从0开始计数 */
    type: Number,
    default: -1,
  },
  subFormColIndex: { /* 子表单组件列索引，从0开始计数 */
    type: Number,
    default: -1,
  },
  subFormRowId: { /* 子表单组件行Id，唯一id且不可变 */
    type: String,
    default: '',
  },
})
const fieldModel: any = ref(null)
const oldFieldValue: any = ref(null)
const rules: any = ref([])
const { widgetSize, handleButtonWidgetClick, registerToRefList, initEventHandler, handleOnCreated, handleOnMounted, unregisterFromRefList } = fieldHock({ field, parentWidget, designState, subFormRowIndex, fieldModel, oldFieldValue, subFormRowId, rules })
onBeforeMount(() => {
  registerToRefList()
  initEventHandler()
  handleOnCreated()
})
onMounted(() => {
  handleOnMounted()
})
onBeforeMount(() => {
  unregisterFromRefList()
})
</script>

<style lang="scss" scoped>
</style>
