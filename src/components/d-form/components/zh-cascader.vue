<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-01-28 09:45:39
-->
<template>
  <el-cascader
      style="width: 100%;"
      v-model="formData[item.prop]"
      :placeholder="item.placeholder"
      :style="item.style"
      :class="item.class"
      :options="item.options"
      :disabled="item.disabled"
      :show-all-levels="item.showAllLevels"
      :separator="item.separator"
      :collapse-tags="item.collapseTags"
      :props="item.props"
      :filterable="item.filterable"
      :debounce="item.debounce"
      :filter-method="item.filterMethod"
      :clearable="item.clearable"
      @change="change"
  >
  </el-cascader>
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
