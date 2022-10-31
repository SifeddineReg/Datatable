<template>
  <div class="tablecard">
    <div class="tableinfo">
      <span>{{title}}</span>
      <small>{{time}}</small>
    </div>  
  </div>
</template>
<script>
  export default {
    props: {
      title: String,
      time: String
    }
  }
</script>

<style scoped>
  span{
    font-size: larger;
  }
  .tableinfo{
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: #F1F1F1;
    width: 100%;
    align-items: flex-start;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .tablecard{
    display: flex;
    align-items: flex-end;
    width: 175px;
    height: 100px;
    background-image: url('../assets/spreadsheet.jpg');
    border-radius: 5px;
  }
</style>