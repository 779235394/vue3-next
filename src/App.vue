<template>
  <!--  <img alt="Vue logo" src="./assets/logo.png"/>-->
  <RouterView/>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'App',
  components: {}
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

}

body {
  padding: 0;
  margin: 0;
}
</style>
