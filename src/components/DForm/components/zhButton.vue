<template>
  <el-button
      :type="item.type"
      :icon="item.icon"
      :loading="item.loading"
      :size="item.size"
      :round="item.round"
      :disabled="item.disabled"
      :style="item.style"
      :class="item.class"
      :plain="item.plain"
      :circle="item.circle "
      :autofocus="item.autofocus"
      :native-type="item.nativeType"
      @click="click">
    {{ item.value }}
  </el-button>
</template>

<script lang="ts">
export default {
  emits: ['event'],
  props: {
    item: { type: Object, default: () => {} },
    formData: { type: Object, default: () => {} },
  },
  setup(prop, context) {
    const click = () => {
      context.emit('event', {
        type: 'click',
        prop: prop.item.prop,
        value: prop.formData[prop.item.prop],
      })
    }

    return { click }
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
