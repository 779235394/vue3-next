<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-25 15:32:30
-->
<template>
  <el-checkbox-group
      v-model="formData[item.prop]"
      :min="item.min"
      :max="item.max"
  >
    <el-checkbox
        v-for="option in options"
        :key="option.value ? option.value : option"
        :label="option.value ? option.value : option"
        :disabled="item.disabled"
        :style="item.style"
        @change="change"
    >
      {{ option.label ? option.label : option }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script setup lang="ts">

const emits = defineEmits(['event'])
const { item, formData } = defineProps({
  item: { type: Object, default: () => {} },
  formData: { type: Object, default: () => {} },
})
onBeforeMount(() => {
  if (!formData[item.prop]) {
    formData[item.prop]=[]
  }
})
const change = () => {
  emits('event', {
    type: 'change',
    prop: item.prop,
    value: formData[item.prop],
  })
}
const options = computed(() => {
  if (item.options instanceof Array) {
    return item.options
  } else {
    const list = item.options.split(',')
    return list.map((item) => {
      return { value: item, label: item }
    })
  }
})
</script>

<style scoped>

</style>
