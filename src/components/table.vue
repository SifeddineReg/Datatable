<template>
  <div class="">
    <table class="dtable"> 
      <tr>
        <td v-for="header in colnames" class="headers">{{header.h1}}</td>
      </tr>
      <tr class="line" v-for="(person,index,key) in tabledata" @dblclick="$emit('delline')">
        <td :colspan="colnames.length" @click="$emit('select',index); showdet=!showdet;">
          <table>
            <tr><td class="info" v-for="value in person">{{value}}</td></tr>
            <tr class="details" v-if="expanded">{{details[index]}}</tr>
          </table>
        </td>        
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    tabledata: Array,
    colnames: Array,
    radio: Boolean,
    unselect: Function,
    del: Boolean,
    expanded: Boolean,
    details: Array
  },
  data(){
    return {
      showdet: false,
      checked: []
    }
  },
  methods: {
  },
  watch:{
    checked(){
      console.log(this.checked)
    }
  }
}
</script>

<style scoped>
.line{
  cursor: pointer;
}
.line .details{
  display: flex;
  justify-content: flex-start;
  max-width: 90%;
  align-self: flex-end;
  word-break: break-word;
}
.line .info{
  min-width: 100px;
  max-width: 100px;
  max-height: 100px;
  word-break: break-word;
  user-select: none;
}
.line td table tr{
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}
.line td table{
  margin: 0;
  display: flex;
  flex-direction: column;
}
.dtable,td{
  /* border: 1px solid black;
  border-collapse: collapse;*/
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 0;
  padding-left: 0;
}
.headers{
  color: aliceblue;
  background-color: black;
  font-weight: bold;
  min-width: 100px;
  max-width: 200px;
  word-break: break-word;
  max-height: 100px;

}
.dtable{
  background-color: aliceblue;
  margin: auto;
  position: relative;
  top: 50%;
  max-height: 650px;
  overflow-y: scroll;
}
</style>
