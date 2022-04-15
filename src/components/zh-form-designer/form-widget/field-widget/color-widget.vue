<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2022-03-10 15:21:15
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-03-10 15:23:53
-->
<template>
  <form-item-wrapper
    :designer="designer"
    :field="field"
    :rules="rules"
    :design-state="designState"
    :parent-widget="parentWidget"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :sub-form-row-index="subFormRowIndex"
    :sub-form-col-index="subFormColIndex"
    :sub-form-row-id="subFormRowId"
  >
    <el-color-picker
      ref="fieldEditor"
      v-model="fieldModel"
      :size="widgetSize"
      :disabled="field.options.disabled"
      @change="handleChangeEvent"
    ></el-color-picker>
  </form-item-wrapper>
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
const { widgetSize, initFieldModel, registerToRefList, initEventHandler, buildFieldRules, handleOnCreated, handleOnMounted, unregisterFromRefList, handleChangeEvent } = fieldHock({ field, parentWidget, designState, subFormRowIndex, fieldModel, oldFieldValue, subFormRowId, rules })
onBeforeMount(() => {
  initFieldModel()
  registerToRefList()
  initEventHandler()
  buildFieldRules()
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
.full-width-input {
  width: 100% !important;
}
</style>
