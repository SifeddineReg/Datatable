<template>
  <div class="signlog">
    <div class="tabchange">
      <input class="log btn active btn-outline-dark" type="button" value="Login" @click="changetab('Login')"/>
      <input class="sign btn btn-outline-dark" type="button" value="Signup" @click="changetab('Signup')"/>
    </div>
    <KeepAlive>
      <component :key="tab" :is="tab" :logerr="logerr" :signerr="signerr" @login="login" @signup="signup"></component>
    </KeepAlive>
  </div>
</template>

<script>
import Login from './login.vue'
import Signup from './signup.vue'
import fbauth from '../firebase/config.js'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth"

const auth = getAuth()

export default {
  components: {
    Login, 
    Signup
  },
  data(){
    return {
      tab: 'Login',
      signerr: '',
      logerr: ''
    }
  },
  methods: {
    changetab(tab){
      this.tab = tab
      if(tab=='Login'){
        document.querySelector('.log').classList.add('active')
        document.querySelector('.sign').classList.remove('active')
      }
      if(tab=='Signup'){
        document.querySelector('.sign').classList.add('active')
        document.querySelector('.log').classList.remove('active')
      }
    },
    async signup(email,pwd){
      await createUserWithEmailAndPassword(auth,email,pwd)
        .then(()=>{
          this.changetab('Login')
        })
        .catch((error)=>{
          this.signerr = error.message
        })
    },
    async login(email,pwd){
      await signInWithEmailAndPassword(auth,email,pwd)
        .then(()=>{
          this.$router.push({name: 'tables'}).catch(()=>{})
        })
        .catch((error)=>{
          this.logerr = error.message
        })
        
    }
  }
}
</script>

<style scoped>
  .tabchange{
    display: flex;
    width: 100%;
  }
  .sbmt{
    width: 320px;
    margin-bottom: 10px ;
  }
  .btn{
    box-shadow: none !important; 
    border: 0;
    border-bottom: solid 1px black;

  }
  .tabchange input{
    width: 50%;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .tabchange input:first-child{
    border-top-right-radius: 0px;
  }
  .tabchange input:last-child{
    border-top-left-radius: 0px;
  }
  .signlog{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    position: fixed;
    top: 27%;
    left: 60%;
    background-color: #F1F1F1;
    border-radius: 5px;
  }
</style>
