<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-01-27 16:26:26
-->
<template>
   <span :class="item.class" :style="item.style">
        {{ item.formatter && item.formatter(formData[item.prop]) || formData[item.prop] }}
    </span>
</template>

<script setup lang="ts">
const { item, formData } = defineProps({
  item: { type: Object, default: () => {} },
  formData: { type: Object, default: () => {} },
})
</script>

<style scoped>

</style>
