<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-07-09 11:37:49
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

<script lang="ts">
export default {
  name: 'ZhRate',
  emits: ['event'],
  props: {
    item: { type: Object, default: () => {} },
    formData: { type: Object, default: () => {} },
  },
  setup(prop, context) {
    const change = () => {
      context.emit('event', {
        type: 'change',
        prop: prop.item.prop,
        value: prop.formData[prop.item.prop],
      })
    }
    return {
      change,
    }
  },
}
</script>

<style scoped>

</style>
