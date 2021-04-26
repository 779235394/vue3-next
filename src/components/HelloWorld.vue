<template>
  <h1>{{ msg }}</h1>
  <h1>count: {{ count }}</h1>
  <el-button type="success" @click="addCount">+1</el-button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const store = useStore()
    const count = computed(() => {
      return store.state.textModules.count
    })
    return {
      count,
      addCount: () => store.dispatch('textModules/set_count'),
    }
  },
})
</script>

<style lang="scss" scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
