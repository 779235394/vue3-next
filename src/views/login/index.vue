/**
* @Author: junlan.he
* @date: 2021/4/25
* @desc:
*/
<template>
  <Particles id="tsparticles" :options="ParticlesOptions" class="particles"/>
</template>

<script>
import {defineComponent} from 'vue';
import {ParticlesOptions} from './LoginData';

export default defineComponent({
  name: 'index',

  setup: () => {
    return {
      ParticlesOptions
    };
  }
});
</script>

<style lang="scss" scoped>
.particles {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  background-color: $login-bg-color;
  top: 0;
  left: 0;
}
</style>
