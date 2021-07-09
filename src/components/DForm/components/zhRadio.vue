<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-07-09 11:38:00
-->
<template>
  <el-radio-group
      v-model="formData[item.prop]"
      :size="item.size"
      @change="change">
    <el-radio
        v-for="option in options"
        :key="option.value?option.value:option"
        :label="option.value?option.value:option"
        :border="item.border"
        :style="item.style"
        :disabled="item.disabled">
      {{ option.label ? option.label : option }}
    </el-radio>
  </el-radio-group>
</template>

<script lang="ts">
import { computed } from 'vue'

export default {
  name: 'ZhRadio',
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
    const options = computed(() => {
      if (prop.item.options instanceof Array) {
        return prop.item.options
      } else {
        const list = prop.item.options.split(',')
        return list.map((item) => {
          return { value: item, label: item }
        })
      }
    })
    return {
      options,
      change,
    }
  },
}
</script>

<style scoped>

</style>
