<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-08 10:01:49
-->
<template>
  <i :class="item.class"></i>
</template>

<script setup lang="ts">
const { item } = defineProps({
  item: { type: Object, default: () => {} },
  // formData: { type: Object, default: () => {} },
})
</script>

<style scoped>

</style>
