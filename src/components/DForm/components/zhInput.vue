<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-07-09 11:40:18
-->
<template>
  <el-input
      v-model="formData[item.prop]"
      :style="item.style?item.style:{width:'100%'}"
      :type="item.type"
      :placeholder="item.placeholder"
      :suffixIcon="item.suffixIcon"
      :prefixIcon="item.prefixIcon"
      :show-password="item.showPassword"
      :maxlength="item.maxlength"
      :rows="item.rows"
      :autosize="item.autosize"
      :minlength="item.minlength"
      :show-word-limit="item.showWordLimit"
      :disabled="item.disabled"
      :clearable="item.clearable"
      @change="change">
  </el-input>
</template>

<script lang="ts">
export default {
  name: 'ZhInput',
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
