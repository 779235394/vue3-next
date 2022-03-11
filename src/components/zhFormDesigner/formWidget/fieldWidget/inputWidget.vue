<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2022-03-08 15:30:07
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-03-10 10:14:13
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
    <el-input
      ref="fieldEditor"
      v-model="fieldModel"
      :disabled="field.options.disabled"
      :readonly="field.options.readonly"
      :size="widgetSize"
      class="hide-spin-button"
      :type="inputType"
      :show-password="field.options.showPassword"
      :placeholder="field.options.placeholder"
      :clearable="field.options.clearable"
      :minlength="field.options.minLength"
      :maxlength="field.options.maxLength"
      :show-word-limit="field.options.showWordLimit"
      :prefix-icon="field.options.prefixIcon"
      :suffix-icon="field.options.suffixIcon"
    >
      <el-button
        slot="append"
        v-if="field.options.appendButton"
        :disabled="field.options.disabled || field.options.appendButtonDisabled"
        :class="field.options.buttonIcon"
      ></el-button>
    </el-input>
  </form-item-wrapper>
</template>

<script setup lang="ts">
import fieldHock from './fieldHock'
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
const fieldModel = ref(null)
const oldFieldValue:any = ref(null)
const rules = ref([])
const inputType = computed(() => {
  if (field.options.type === 'number') {
    return 'text' // 当input的type设置为number时，如果输入非数字字符，则v-model拿到的值为空字符串，无法实现输入校验！故屏蔽之！！
  }
  return field.options.type
})
const { widgetSize, initFieldModel, registerToRefList, initEventHandler, buildFieldRules, handleOnCreated, handleOnMounted, unregisterFromRefList } = fieldHock({ field, parentWidget, designState, subFormRowIndex, fieldModel, oldFieldValue, subFormRowId, rules })
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

