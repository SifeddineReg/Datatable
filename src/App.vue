<template>
  <div id="app">
    <router-view @nobackgroundimg="nobackgroundimg" @yesbackgroundimg="yesbackgroundimg"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  updated(){
    // alert(document.body.style.backgroundImage)
    // if(this.$route.name!='maker') document.body.style.backgroundImage = 'url(./assets/bgimg.jpeg)';
    // else document.body.style.backgroundImage = 'none'
  },
  methods: {
    nobackgroundimg(value){
      document.body.style.backgroundImage = 'none'
    },
    yesbackgroundimg(value){
      document.body.style.backgroundImage = url('./assets/bgimg.jpeg')
    }
  }
}
</script>

<style>
body{
  background-image: url('./assets/bgimg.jpeg');
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
