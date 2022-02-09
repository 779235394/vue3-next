<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-08 10:57:43
-->
<template>
  <el-switch
      v-model="formData[item.prop]"
      :width="item.width"
      :active-color="item.activeColor"
      :inactive-color="item.inactiveColor"
      :active-value=" item.activeValue"
      :inactive-value="item.inactiveValue"
      :active-text="item.activeText"
      :inactive-text="item.inactiveText"
      :disabled="item.disabled"
      :style="item.style"
      @change="change">
  </el-switch>
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
