<!--
 * @Descripttion: 动态表单页
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-07-12 17:10:58
-->
<template>
  <DForm ref="DForm"  :rules="rules" :needToast="true" :formData="formData" @event="event" :formCols="formCols">
      <template #test>
        <el-input v-model="formData.date5"></el-input>
      </template>
  </DForm>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import DForm from 'components/DForm/DForm.vue'
export default defineComponent({
  name: 'DynamicForm',
  components: { DForm },
  emits: ['handle-size-change', 'handle-current-change'],
  setup() {
    const formState = reactive({
      rules: {
        date1: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
      },
      formData: {
        date5: '测试默认值与slot',
        date10: '0',
      },
      formCols: [
        [
          {
            eType: 'Input',
            placeholder: '请输入姓名',
            label: 'Input',
            prop: 'date1',
            noShow: false,
            span: 6,
            suffixIcon: 'el-icon-eleme',
          },
          { eType: 'slot', label: '自定义slot', slotName: 'test', prop: 'date5', span: 6 },
          {
            eType: 'Radio',
            label: 'Radio',
            options: [{ label: '手机', value: '0' }, { label: '电脑', value: '1' }],
            prop: 'date10',
            span: 6,
          },
          {
            eType: 'RadioButton',
            label: 'RadioButton',
            options: [{ label: '手机', value: '0' }, { label: '电脑', value: '1' }],
            prop: 'date11',
            span: 6,
          },
        ],
        [
          {
            eType: 'InputNumber',
            label: 'InputNumber',
            prop: 'date16',
            span: 6,
          },
          {
            eType: 'CheckButton',
            label: 'CheckButton',
            noShow: false,
            options: [{ label: '手机', value: '0' }, { label: '电脑', value: '1' }],
            // options: '手机,电脑',
            // options: ['手机', '电脑'],
            prop: 'date15',
            span: 6,
          },
          {
            eType: 'Check',
            label: 'CheckBox',
            options: [{ label: '手机', value: '0' }, { label: '电脑', value: '1' }],
            // options: '手机,电脑',
            prop: 'date13',
            span: 6,
          },
          {
            eType: 'DatePicker',
            type: 'year',
            label: 'year',
            format: 'yyyy',
            prop: 'date18',
            span: 6,
          },
        ],
        [
          {
            eType: 'Select',
            label: 'Select',
            options: [{ label: '手机', value: '0' }, { label: '电脑', value: '1' }],
            prop: 'date17',
            span: 6,
          },
          {
            eType: 'DatePicker',
            type: 'date',
            label: 'date',
            format: 'YYYY-MM-DD',
            prop: 'date19',
            span: 6,
          },
          {
            eType: 'DatePicker',
            type: 'datetime',
            label: 'datetime',
            format: 'YYYY-MM-DD HH:mm:ss',
            prop: 'date20',
            span: 6,
          },
        ],
        [
          {
            eType: 'DatePicker',
            type: 'daterange',
            label: 'daterange',
            format: 'YYYY-MM-DD',
            prop: 'date21',
            span: 6,
          },
          {
            eType: 'DatePicker',
            type: 'datetimerange',
            label: 'datetimerange',
            format: 'YYYY-MM-DD HH:mm:ss',
            prop: 'date22',
            span: 6,
          },
          {
            eType: 'DatePicker',
            type: 'dates',
            label: 'dates',
            format: 'YYYY-MM-DD',
            prop: 'date23',
            span: 6,
          },
          {
            eType: 'TimePicker',
            label: 'TimePicker',
            prop: 'date24',
            noShow: false,
            span: 6,
          },
        ],
        [
          {
            eType: 'Switch',
            label: 'Switch',
            prop: 'date25',
            span: 6,
          },
          {
            eType: 'Slider',
            label: 'Slider',
            prop: 'date26',
            noShow: false,
            span: 12,
          },
          { eType: 'Button', value: '提交', type: 'success', prop: 'submit', span: 2 },
          { eType: 'Button', value: '重置', type: 'success', prop: 'reset', span: 2 },
        ],
      ],
    })
    const formMethods = reactive({
      event: (val) => {
        console.log(val)
      },
    })

    return {
      ...toRefs(formState),
      ...toRefs(formMethods),
    }
  },
})
</script>

<style scoped>

</style>
