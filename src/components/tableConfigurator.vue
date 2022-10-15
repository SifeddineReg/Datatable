<template>
  <div class="configbar">
    <div>
      <header>Table theme:</header>
      <button class="button" @click="$emit('changetheme')">{{!dark ? yes : no}} Mode</button>
    </div>
    <div>
      <header>Columns:</header>
      <button class="button" :disabled="disablebtn" @click="$emit('addcol')">add Column</button>
      <div v-for="(column,index) in colnames" class="cols">
        <input type="text" v-model="column.h1">
        <button v-if="colnames.length>1" @click="$emit('removecol',column,index)">x</button>
      </div>
    </div>
    <div>
      <header>Rows:</header>
      <button class="button" @click="$emit('addline')">add line</button>
      <div class="multiplelines">
        <button @click="$emit('addlines',lines)">add lines</button>
        <input type="number" @keyup.enter="$emit('addlines',lines)" v-model="lines"/>
      </div>  
      <button class="button" v-if="tabledata.length!=0" @click="$emit('deleteall')">delete all lines</button>
      <button class="button" v-if="del" @click="$emit('delline')">delete line</button>
      <div class="editline" v-for="(value,key) in enrg">
        <input type="text" v-model="enrg[key]" :placeholder="value">
      </div>
    </div>
    <div v-if="del">
      <header>Row Details</header>
      <textarea @keyup="$emit('changedet',details[indexsel],indexsel)" v-model="details[indexsel]"></textarea>
    </div>  
  </div>
</template>

<script>
export default {
  data() {
    return{
      lines: 0,
      yes: 'Dark',
      no: 'Light',
      yess: 'Add borders',
      nos: 'Remove borders'
    }
  },
  props: {
    tabledata: Array,
    colnames: Array,
    enrg: Object,
    disablebtn: Boolean,
    del: Boolean,
    indexsel: Number,
    details: Array,
    dark: Boolean,
    border: Boolean
  },
  methods: {
  },
}
</script>
<style scoped>
  .config div{
    width: 100%;
  }
  header{
    font-size: large;
    font-weight: 500;
    color: antiquewhite;
    background-color: black;
    padding: 5px;
    margin-top: 5px;
  }
  .cols{
    display: flex;
    align-items: center;
  }
  .button{
    width: 100%;
  }
  input{
    width: 100%;
  }
  .editline input{
    width: 100%;
  }
  .configbar:not(header){
    display: flex;
    flex-direction: row;
    background-color: gray;
    border: 2px solid black;
    padding: 10px;
    position: fixed;
    right: 0;
    height: 100%;
    top: 0;
    min-width: 182px;
    max-width: 182px;
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