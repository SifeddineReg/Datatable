<template>
  <div class="login">
    <span class="logerror">{{logerr}}</span>
    <form class="form" >
      <div class="grp">
        <label>Email:</label>
        <input v-model="email" class="form-control" type="email"/>
      </div>
      <div class="grp">
        <label>Password:</label>
        <input v-model="pwd" class="form-control" type="password"/>
      </div>
      <input class="sbmt btn btn-dark" type="button" value="Login" @click="login"/>
    </form>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        email: '',
        pwd: ''
      }
    },
    props: {
      logerr: String
    },
    watch:{
      logerr(){
        document.querySelector('.logerror').style.display = 'block'
      }
    },
    methods: {
      login(){
        this.$emit('login',this.email,this.pwd)
      }
    }
  }
</script>

<style scoped>
  .grp{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 5px;
  }
  .sbmt{
    width: 100%;
    margin-top: 10px ;
  }
  span{
    width: 100%;
    text-align: center;
    font-weight: bolder;
    background-color: orange;
    padding: 5px;
    margin-top: 10px;
    display: none;
  }
  .login{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .form{
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 350px;
    height: 100%;
  }
</style>