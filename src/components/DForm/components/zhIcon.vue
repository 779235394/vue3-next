<template>
  <i :class="item.class"></i>
</template>

<script lang="ts">
export default {
  name: 'ZhIcon',
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
