<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  updated(){
    if(this.$route.name=='maker') ;
    else document.body.backgroundImage = 'none'
  }
}
</script>

<style>
body{
  /* background-image: url('./assets/bgimg.jpeg'); */
  background-color: antiquewhite;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
