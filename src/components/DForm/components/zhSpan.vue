<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-07-09 11:41:22
-->
<template>
   <span :class="item.class" :style="item.style">
        {{ item.formatter && item.formatter(formData[item.prop]) || formData[item.prop] }}
    </span>
</template>

<script lang="ts">

export default {
  name: 'ZhSpan',
  props: {
    item: { type: Object, default: () => {} },
    formData: { type: Object, default: () => {} },
  },
  setup() {

  },
}
</script>

<style scoped>

</style>
