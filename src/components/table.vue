<template>
  <div>
    <table class="dtable"> 
      
      <thead>
        <tr><td v-for="header in colnames" class="headers">{{header.h1}}</td></tr>
      </thead>
      <tbody :style="{backgroundColor: tablecolor}">
        <tr class="line" v-for="(person,index) in lineinpage" @click="$emit('select',index)" @dblclick="$emit('delline')">
          <td class="info" v-for="value in person">{{value}}</td>
        </tr>      
      </tbody>
    </table>
    <ul class="pagination">
      <li class="page-item" @click="$emit('previous')"><a class="page-link">Previous</a></li>
      <li class="page-item" v-for="page in totalpages" @click="$emit('pagelines',page)"><a class="page-link">{{page}}</a></li>
      <li class="page-item" @click="$emit('next')"><a class="page-link">Next</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tabledata: Array,
    colnames: Array,
    del: Boolean,
    currentpage: Number,
    linesperpage: Number,
    lineinpage: Array,
    tablecolor: String
  },
  data(){
    return {
       variable:  'sifeddine'
    }
  },
  computed: {
    totalpages(){
      return Math.ceil(this.tabledata.length/this.linesperpage)
    }
  },
  methods: {

  }
}
</script>

<style scoped>
a{
  padding: 6px 12px 6px 12px;
}
.line{
  cursor: pointer;
}
.pagination{
  border: 0;
}
li{
  background-color: aliceblue;
}
.line .info{
  min-width: 110px;
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
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 0;
  padding-left: 0;
}
.headers{
  color: aliceblue;
  background-color: black;
  min-width: 100px;
  max-width: 130px;
  padding-left: 2px;
  padding-right: 2px;
  word-break: break-word;
  max-height: 120px;

}
.dtable{
  background-color: aliceblue;
  margin: auto;
  position: relative;
  top: 50%;
  max-height: 650px;
  overflow-y: scroll;
}
.table>:not(caption)>*>* {
    /* padding: 0.5rem 0.5rem; */
    background-color: var(--bs-table-bg);
    border-bottom-width: 1px;
    box-shadow: inset 0 0 0 9999px var(--bs-table-accent-bg);
}
</style>
