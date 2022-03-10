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
    <el-select
      ref="fieldEditor"
      v-model="fieldModel"
      class="full-width-input"
      :disabled="field.options.disabled"
      :size="widgetSize"
      :clearable="field.options.clearable"
      :filterable="field.options.filterable"
      :allow-create="field.options.allowCreate"
      :default-first-option="allowDefaultFirstOption"
      :automatic-dropdown="field.options.automaticDropdown"
      :multiple="field.options.multiple"
      :multiple-limit="field.options.multipleLimit"
      :placeholder="field.options.placeholder || '请选择'"
      :remote="field.options.remote"
      :remote-method="remoteQuery"
      @focus="handleFocusCustomEvent"
      @blur="handleBlurCustomEvent"
      @change="handleChangeEvent"
    >
      <el-option
        v-for="item in field.options.optionItems"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      ></el-option>
    </el-select>
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
const fieldModel: any = ref([])
const oldFieldValue: any = ref(null)
const rules: any = ref([])
const allowDefaultFirstOption = computed(() => {
  return (!!field.options.filterable && !!field.options.allowCreate)
})
const { widgetSize, initFieldModel, registerToRefList, initEventHandler, buildFieldRules, handleOnCreated, handleOnMounted, unregisterFromRefList, handleChangeEvent, remoteQuery, handleBlurCustomEvent, handleFocusCustomEvent } = fieldHock({ field, parentWidget, designState, subFormRowIndex, fieldModel, oldFieldValue, subFormRowId, rules })
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
