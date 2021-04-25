/**
* @Author: junlan.he
* @date: 2021/4/23
* @desc:
*/
<template>
  <h1>count: {{ count }}</h1>
  <el-button type="success" @click="addCount">+1</el-button>
  <el-button type="success" @click="handJump">路由跳转</el-button>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

export default defineComponent({
  name: 'Home',
  setup: ()=> {
    const store = useStore();
    const router = useRouter();
    const count = computed(() => {
      return store.state.textModules.count;
    });
    return {
      count,
      addCount: () => store.dispatch('textModules/set_count'),
      handJump: () => router.push({path: 'Text'})
    };
  }
});
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
