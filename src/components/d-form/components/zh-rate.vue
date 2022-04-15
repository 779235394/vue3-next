<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-08 10:52:53
-->
<template>
  <el-rate
      v-model="formData[item.prop]"
      :colors="item.colors"
      :void-color="item.voidColor"
      :disabled-void-color="item.disabledVoidColor"
      :disabled-void-icon-class="item.disabledVoidIconClass"
      :max="item.max"
      :disabled="item.disabled"
      :class="item.class"
      :icon-classes="item.iconClasses"
      :void-icon-class="item.voidIconClass"
      :allow-half="item.allowHalf"
      :style="item.style"
      :texts="item.texts"
      :show-text="item.showText"
      :low-threshold="item.lowThreshold"
      @change="change">
  </el-rate>
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
