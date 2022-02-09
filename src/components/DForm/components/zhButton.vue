<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-01-28 09:42:54
-->
<template>
  <el-button
      :type="item.type"
      :icon="item.icon"
      :loading="item.loading"
      :size="item.size"
      :round="item.round"
      :disabled="item.disabled"
      :style="item.style"
      :class="item.class"
      :plain="item.plain"
      :circle="item.circle "
      :autofocus="item.autofocus"
      :native-type="item.nativeType"
      @click="click">
    {{ item.value }}
  </el-button>
</template>

<script setup lang="ts">
const emits = defineEmits(['event'])

const { item, formData } = defineProps({
  item: { type: Object, default: () => {} },
  formData: { type: Object, default: () => {} },
})

const click = () => {
  emits('event', {
    type: 'click',
    prop: item.prop,
    value: formData[item.prop],
  })
}
</script>

