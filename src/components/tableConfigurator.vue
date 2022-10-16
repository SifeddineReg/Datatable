<template>
  <div class="configbar">
    <div class="configblock">
      <button class="button" @click="$emit('changetheme')">Save Table</button>
      <button class="button" @click="$emit('changetheme'); showexp=!showexp">Export Table</button>
      <div class="export" v-if="showexp">
        <button class="btnexport" @click="$emit('exportjson')">Json&nbsp;<i class="bi bi-filetype-json"></i></button>
        <button class="btnexport" @click="$emit('exportcsv')">Excel&nbsp;<i class="bi bi-file-excel"></i></button>
        <button class="btnexport" @click="$emit('exportimg')">Image&nbsp;<i class="bi bi-images"></i></button>
      </div>
    </div>
    <div class="configblock">
      <header>Columns:</header>
      <button class="button" :disabled="disablebtn" @click="$emit('addcol')">add Column</button>
      <div v-for="(column,index) in colnames" class="cols">
        <input type="text" v-model="column.h1">
        <button v-if="colnames.length>1" @click="$emit('removecol',column,index)">x</button>
      </div>
    </div>
    <div class="configblock">
      <header>Rows:</header>
      <div class="clrnum">
        <select @change="$emit('rowcolor',tablecolor)" v-model="tablecolor"><option v-for="color in colors">{{color}}</option></select>
        <select @change="$emit('rowsperpage',rowsperpage)" v-model="rowsperpage"><option v-for="num in numberpages">{{num}}</option></select>
      </div>
        
      <button class="button" @click="$emit('addline')">add line</button>
      <div class="multiplelines">
        <button class="button multi" @click="$emit('addlines',lines)">add lines</button>
        <input type="number" @keyup.enter="$emit('addlines',lines)" v-model="lines"/>
      </div>  
      <button class="button" v-if="tabledata.length!=0" @click="$emit('deleteall')">delete all lines</button>
      <button class="button" v-if="del" @click="$emit('delline')">delete line</button>
      <div class="editline" v-for="(value,key) in enrg">
        <input type="text" v-model="enrg[key]" :placeholder="value">
      </div>
    </div> 
  </div>
</template>

<script>
export default {
  data() {
    return{
      lines: 0,
      showexp: false,
      colors: ['Dark theme','Lightskyblue','Lightsalmon','Lightgreen','Lightyellow'],
      tablecolor: '',
      numberpages: ['5','7','10'],
      rowsperpage: ''
    }
  },
  props: {
    tabledata: Array,
    colnames: Array,
    enrg: Object,
    disablebtn: Boolean,
    del: Boolean,
    indexsel: Number
  },
  methods: {
  },
}
</script>
<style scoped>
  .configblock{
    width: 100%;
  }
  select,option{
    padding: 3px;
    width: 100%;
  }
  .clrnum{
    display: flex;
  }
  .export{
    display: flex;
    flex-direction: column;
  }
  i{
    color: aliceblue;
  }
  .btnexport{
    background-color: black;
    color: aliceblue;
    border: 0;
    border-bottom: 1px solid aliceblue;
    padding: 5px;
  }
  header{
    font-size: large;
    font-weight: 500;
    color: antiquewhite;
    background-color: black;
    padding: 5px;
    margin-top: 5px;
    text-align: start;
  }
  .cols{
    display: flex;
    align-items: center;
  }
  .button{
    width: 100%;
    background-color: darkgray;
    color: aliceblue;
  }
  input{
    width: 100%;
  }
  .editline input{
    width: 100%;
  }
  .configbar{
    display: flex;
    flex-direction: row;
    background-color: black;
    border: 1px solid black;
    padding: 2px;
    position: fixed;
    right: 0;
    height: 100%;
    top: 0;
    width: 100%;
    min-width: 250px;
    max-width: 250px;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  .configbar::-webkit-scrollbar {
    display: none;
  }
  .multiplelines{
    display: flex;
  }
  .multiplelines button{
    width: 80%;
  }
  .multiplelines input{
    width: 20%;
    text-align: center;
  }
</style>