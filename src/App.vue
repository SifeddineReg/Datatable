<template>
  <div id="app">
    <signlog/>
  </div>
</template>

<script>
import signlog from './components/signlog.vue'
export default {
  name: 'App',
  components: {
    signlog
  }
}
</script>

<style>
body{
  background-image: url('./assets/bgimg.jpeg');
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
