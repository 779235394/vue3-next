<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-07-09 11:39:08
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

<script lang="ts">
import { computed, onBeforeMount } from 'vue'

export default {
  name: 'ZhCheck',
  emits: ['event'],
  props: {
    item: { type: Object, default: () => {} },
    formData: { type: Object, default: () => {} },
  },
  setup(prop, context) {
    onBeforeMount(() => {
      if (!prop.formData[prop.item.prop]) {
        prop.formData[prop.item.prop]=[]
      }
    })
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
