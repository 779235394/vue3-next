<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2022-03-07 14:38:30
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-03-10 10:05:35
-->
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup lang="ts">
const { iconClass, className } = defineProps({
  iconClass: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
})
const iconName = computed(() => `#icon-${iconClass}`)
const svgClass = computed(() => {
  if (className) {
    return 'svg-icon ' + className
  } else {
    return 'svg-icon'
  }
})
</script>

<style lang="scss" scoped>
  .svg-icon {
    width: 1.1em;
    height: 1.1em;
    margin-left: 0.6em;
    margin-right: 0.35em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
