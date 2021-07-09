<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-07-09 11:39:42
-->
<template>
  <el-cascader
      style="width: 100%;"
      v-model="formData[item.prop]"
      :placeholder="item.placeholder"
      :style="item.style"
      :class="item.class"
      :options="item.options"
      :disabled="item.disabled"
      :show-all-levels="item.showAllLevels"
      :separator="item.separator"
      :collapse-tags="item.collapseTags"
      :props="item.props"
      :filterable="item.filterable"
      :debounce="item.debounce"
      :filter-method="item.filterMethod"
      :clearable="item.clearable"
      @change="change"
  >
  </el-cascader>
</template>

<script lang="ts">
export default {
  name: 'ZhCascader',
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
