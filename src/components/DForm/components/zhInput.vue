<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-08 11:10:17
-->
<template>
  <el-input
      v-model="formData[item.prop]"
      :style="item.style?item.style:{width:'100%'}"
      :type="item.type"
      :placeholder="item.placeholder"
      :suffixIcon="item.suffixIcon"
      :prefixIcon="item.prefixIcon"
      :show-password="item.showPassword"
      :maxlength="item.maxlength"
      :rows="item.rows"
      :autosize="item.autosize"
      :minlength="item.minlength"
      :show-word-limit="item.showWordLimit"
      :disabled="item.disabled"
      :clearable="item.clearable"
      @change="change">
  </el-input>
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
