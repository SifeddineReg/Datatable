<template>
  <div class="buttons">
    <input class="btn btn-outline" type="button" value="Logout" @click="$emit('logout')"/>
    <input class="btn btn-outline" type="button" value="Create New" @click="createnew"/>
  </div>
</template>

<script>
  export default {
    methods: {
      createnew(){
        let title = prompt("Enter table's name:")
        this.$emit('createnew',title)
      }
    }
  } 
</script>

<style scoped>  
  .buttons{
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    width: 150px;
    justify-content: center;
  }
  .btn{
    background-color: #F1F1F1;
    margin-bottom: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
</style>