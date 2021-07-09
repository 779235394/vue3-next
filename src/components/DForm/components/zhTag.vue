<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-07-09 11:41:31
-->
<template>
  <div class="zxTag">
    <el-tag
        v-for="tag in options"
        :key="tag.label"
        :type="item.type"
        :closable="item.closable"
        :disable-transitions="item.disableTransitions"
        :hit="item.hit"
        :color="item.color"
        :size="item.size"
        :effect="item.effect"
        @close="close(tag)"
        @click="click(tag)">
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'

export default {
  name: 'ZhTag',
  props: {
    item: { type: Object, default: () => {} },
    formData: {},
  },
  emits: ['event'],
  setup(prop, context) {
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
    const close = (item) => {
      context.emit('event', {
        type: 'close',
        prop: prop.item.prop,
        value: item,
      })
    }
    const click = (item) => {
      context.emit('event', {
        type: 'click',
        prop: prop.item.prop,
        value: item,
      })
    }
    return {
      options,
      close,
      click,
    }
  },
}
</script>

<style scoped>
.el-tag {
  margin-right: 10px;
}

</style>
