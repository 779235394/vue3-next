<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-08 09:53:35
-->
<template>
  <el-color-picker
      v-model="formData[item.prop]"
      :disabled="item.disabled"
      :size="item.size"
      :color-format="item.colorFormat"
      :predefine="item.predefine"
      :show-alpha="item.showAlpha"
      @change="change">
  </el-color-picker>
</template>

<script setup lang="ts">
const emits = defineEmits(['event'])
const { item, formData } = defineProps({
  item: { type: Object, default: () => {} },
  formData: { type: Object, default: () => {} },
})
const change = () => {
  emits('event', {
    type: 'change',
    prop: item.prop,
    value: formData[item.prop],
  })
}
</script>

<style scoped>

</style>
