<template>
  <div class="signup">
    <span class="signerror">{{signerr}}</span>
    <form class="form">
      <div class="grp">
        <label>Email:</label>
        <input v-model="email" class="form-control" type="email"/>
      </div>
      <div class="grp">
        <label>Password:</label>
        <input v-model="pwd" class="form-control" type="password"/>
      </div>
      <div class="grp">
        <label>Confirm password:</label>
        <input v-model="pwd2" class="form-control" type="password"/>
      </div>
      <input class="sbmt btn btn-dark" type="button" value="Signup" @click="signup"/>
    </form>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        email: '',
        pwd: '',
        pwd2: ''
      }
    },
    props: {
      signerr: String
    },
    watch:{
      signerr(){
        document.querySelector('.signerror').style.display = 'block'
      }
    },  
    methods: {
      signup(){
        if(this.pwd!=this.pwd2){
          document.querySelector('.signerror').innerHTML = "Passwords don't match"
          document.querySelector('.signerror').style.display = 'block'
        }
        else{
          this.$emit('signup',this.email,this.pwd)
        }
      }
    }
  }
</script>

<style scoped>
  span{
    width: 100%;
    text-align: center;
    font-weight: bolder;
    background-color: orange;
    padding: 5px;
    margin-top: 10px;
    display: none;
  }
  .sbmt{
    width: 100%;
    margin-top: 10px ;
  }
  .grp{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 5px;
  }
  .signup{
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