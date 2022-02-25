<!--
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-03-15 23:38:42
 * @LastEditors: huangzihong
 * @LastEditTime: 2022-02-08 10:58:22
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

<script setup lang="ts">


const emits = defineEmits(['event'])

const { item } = defineProps({
  item: { type: Object, default: () => {} },
  // formData: { type: Object, default: () => {} },
})
const options = computed(() => {
  if (item.options instanceof Array) {
    return item.options
  } else {
    const list = item.options.split(',')
    return list.map((item) => {
      return { value: item, label: item }
    })
  }
})
const close = (item) => {
  emits('event', {
    type: 'close',
    prop: item.prop,
    value: item,
  })
}
const click = (item) => {
  emits('event', {
    type: 'click',
    prop: item.prop,
    value: item,
  })
}
</script>

<style scoped>
.el-tag {
  margin-right: 10px;
}

</style>
