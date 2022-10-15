<template>
  <div class="signup">
    <form class="form">
      <div class="grp">
        <label>Email:</label>
        <input v-model="email" class="form-control" type="text"/>
      </div>
      <div class="grp">
        <label>Password:</label>
        <input v-model="pwd" class="form-control" type="text"/>
      </div>
      <div class="grp">
        <label>Confirm password:</label>
        <input v-model="pwd" class="form-control" type="text"/>
      </div>
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
  .signup{
    display: flex;
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