<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import signlog from './components/signlog.vue'
import tablecard from './components/tablecard.vue'
import tables from './components/dsptables.vue'
import maker from './components/tablemaker.vue'
export default {
  name: 'App',
  components: {
    signlog,
    tablecard,
    tables,
    maker
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
