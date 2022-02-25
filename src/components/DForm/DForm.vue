<!--
 * @Descripttion: 动态表单
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-25 15:32:23
-->
<template>
  <el-form
      ref="formRef"
      :model="formData"
      :label-suffix="labelSuffix"
      :status-icon="statusIcon"
      :size="size"
      :disabled="disabled"
      :inline="isInline"
      :label-width="labelWidth"
      :label-position="labelPosition"
      :rules="rules">
    <el-row
        v-for="(items,index) in formCols"
        :key="index"
        :gutter="items&&items.gutter?items.gutter:0">
      <template
          v-for="item in items">
        <el-col
            v-if="!item.noShow"
            :span="item.span"
            :key="item.prop"
            :offset="item.offset">
          <el-form-item
              :label="item.noFormItem?'':item.label"
              :prop="item.prop"
              :label-width="item.noFormItem?'0':labelWidth">
            <slot v-if="item.eType==='slot'" :name="item.slotName" :data="{...item,...formData}"></slot>
            <m-element v-else :item="item" :form-data="formData" @event="event"></m-element>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import mElement from './mElement.vue'
import { ElMessage } from 'element-plus'

const { disabled, needToast, labelPosition, formData, rules, formCols, isInline, statusIcon, size, labelSuffix, labelWidth } = defineProps({
  disabled: { type: Boolean, default: false }, // 是否禁用
  needToast: { type: Boolean, default: false }, // 是否需要校验提示弹窗
  labelPosition: { type: String, default: 'right' }, // label对齐方式
  formData: { type: Object, default: null }, // 表单数据
  rules: { type: Object, default: null }, // 表单校验规则
  formCols: { type: Array as () => Array<any>, default: () => [[{}]] }, // 表单分栏
  isInline: { type: Boolean, default: false }, // 行内表单模式
  statusIcon: { type: Boolean, default: false }, // 是否在输入框中显示校验结果反馈图标
  size: { type: String, default: 'default' }, // 用于控制该表单内组件的尺寸 large / default / small
  labelSuffix: { type: String, default: '：' }, // 表单域标签的后缀
  labelWidth: { type: String, default: '120px' }, // 表单域标签的宽度
})
const emits = defineEmits(['event', 'submit', 'reset'])

watch(formCols, () => {
  formCols.forEach((items: any) => {
    items.forEach((item) => {
      if (item.noShow) {
        if (item.eType === 'Check' || item.eType === 'CheckButton') {
          formData[item.prop] = []
        } else {
          delete formData[item.prop]
        }
      }
    })
  })
})
type FormInstance = InstanceType<typeof ElForm>
const formRef:any = ref<FormInstance>()
const event = (params) => {
  emits('event', params)
  console.log('event', params)
  if (params.prop === 'submit') {
    submit().then(() => {
      emits('submit')
    })
  } else if (params.prop === 'reset') {
    reset()
    emits('reset')
  }
}
// // 提交校验
const submit = () => {
  return new Promise((resolve) => {
    formRef.value.validate((valid, message) => {
      if (valid) { resolve(valid) } else if (needToast) {
        ElMessage({
          type: 'error',
          message: message[Object.keys(message)[0]][0].message ? message[Object.keys(message)[0]][0].message : '校验失败',
        })
      }
    })
  })
}
// // 重置
const reset = () => {
  formRef.value.resetFields()
}

// 设置是否展示
const setNoShow = (prop, value) => {
  setNewValue(prop, 'noShow', value)
}
// 设置radio checkbox options值
const setOptions = (prop, value) => {
  setNewValue(prop, 'options', value)
}

/**
     * 改变二维数组中某个值
     * @param prop 数组中唯一标识值
     * @param key 需要修改的字段
     * @param value 需要修改的值
     * */

const setNewValue = (prop, key, value) => {
  let two = -1
  const one = formCols.findIndex((item: any) => {
    const iIndex = item.findIndex((iItem) => {
      return iItem.prop === prop
    })
    if (iIndex !== -1) {
      two = iIndex
      return true
    }
  })
  if (one === -1 || two === -1) {
    console.log('找不到要设置的字段')
    return
  }
  formCols[one][two][key] = value
}

defineExpose({
  setOptions,
  setNoShow,
})
</script>

<style scoped>

</style>
