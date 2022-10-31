<template>
  <div >
    <input type="button" class="back btn btn-outline-secondary" value="<< Back" @click="back"/>
    <datat class="table tablee" :currentpage="currentpage" :linesperpage="linesperpage" :lineinpage="lineinpage" :del="toberem" :tabledata="data" :colnames="headers" @select="select"  @delline="delline" @pagelines="pagelines" :tablecolor="tablecolor" @next="next" @previous="previous"/>
    <TableConfigurator class="config col-md-4" :exp="exp" :dark="darkmode" :indexsel="indexsel" :del="toberem" :disablebtn="disable" :enrg="objectpers" :tabledata="data" :colnames="headers" @addline="addline" @addcol="addcol" @deleteall="deleteall" @removecol="removecol" @delline="delline" @addlines="addlines" @changetheme="changetheme" @showexport="showexport" @exportcsv="exportcsv" @exportimg="exportimg" @exportjson="exportjson" @savetable="savetable" @rowcolor="rowcolor" @rowsperpage="rowsperpage" @sortcol="sortcol"/>
  </div>
</template>

<script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
<script>
  import datat from './table.vue'
  import TableConfigurator from './tableConfigurator.vue'
  import html2canvas from 'html2canvas' 
  import { Firestore, auth } from '../firebase/config.js'
  import { collection, doc, setDoc, getDoc, getDocs, where, query, updateDoc} from "firebase/firestore"

  const tables = collection(Firestore,'tables')
  
  export default {
    components: {
      datat,
      TableConfigurator
    },
    created(){
      const tableid = this.$route.params.id
      this.idt = tableid
      auth.onAuthStateChanged(async (user)=>{
        if (user) {
          this.user = user
          const docs = await getDoc(doc(tables,tableid))
          if(docs.exists()){
            this.headers=docs.data().columns
            let cols = []
            this.headers.forEach((col=>{
              cols.push(col.h1)
            }))
            docs.data().lines.forEach((line,index)=>{
              let obj = {}
              cols.forEach((col)=>{
                obj[col]=line[col]
              })
              this.data.push(obj)
            })
            if(this.data.length!=0) this.disable=true
            else this.disable = false
            if(docs.data().tablecolor == "Dark theme") this.rowcolor("Dark theme")
            else this.rowcolor(docs.data().tablecolor)
            this.linesperpage = docs.data().linesperpage
            this.pagelines(this.currentpage)
          }
          else this.$router.push('tables').catch(()=>{})
        }
        else {
          this.$router.push('home').catch(()=>{})
        }
      })
    },
    props: {
    },
    data(){
      return {
        idt: "",
        user: null,
        exp: false,
        toberem: false,
        indexsel: 0,
        disable: false,
        col: 0,
        objectpers: {},
        linessel: [],
        headers: [],
        data: [],
        tablecolor: "",
        linesperpage: 10,
        lineinpage: [],
        currentpage: 1
      }
    },
    methods: {
      sortcol(col,updown){
        if(updown=='up'){
          this.data = this.data.sort((a,b)=>{
            if(a[col].toLowerCase() < b[col].toLowerCase()) return -1
          })
          this.pagelines(this.currentpage)
        }
        else{
          this.data = this.data.sort((a,b)=>{
            if(a[col].toLowerCase() > b[col].toLowerCase()) return -1
          })
          this.pagelines(this.currentpage)
        }
      },
      rowsperpage(numrows){
        this.linesperpage=parseInt(numrows)
        this.pagelines(this.currentpage)
      },
      previous(){
        if(this.currentpage!=1) this.currentpage--
        this.pagelines(this.currentpage)
      },
      next(){
        if(this.currentpage!=this.totalpages()) this.currentpage++
        this.pagelines(this.currentpage)
      },
      totalpages(){
        return Math.ceil(this.data.length/this.linesperpage)
      },
      pagelines(numpage){
        this.currentpage = numpage
        this.lineinpage = []
        let first = (numpage*this.linesperpage)-this.linesperpage
        let last = (numpage*this.linesperpage)
        this.lineinpage = this.data.slice(first,last)
      },
      rowcolor(color){
        if(color=="Dark theme"){
          document.querySelector(".dtable").classList.add("table-dark")
          this.tablecolor = color
        }
        else{
          document.querySelector(".dtable").classList.remove("table-dark")
          let row = document.querySelector("tbody")
          row.style.backgroundColor = color
          this.tablecolor = color
        }
      },
      back(){
        this.$router.push('tables').catch(()=>{})
      },
      async savetable(lines,cols){
        if(confirm("Save table?")){
          await updateDoc(doc(tables,this.idt),{
            'columns': this.headers,
            'lines': this.data,
            'timestamp': new Date().toLocaleDateString(),
            'tablecolor': this.tablecolor,
            'linesperpage': this.linesperpage
          })
          alert('table saved')
        }
      },
      exportjson(){
      let jsonfile = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data))
      let anchor = document.createElement('a')
      anchor.setAttribute('href',jsonfile)
      anchor.setAttribute('download',"table.json")
      anchor.click()
      anchor.remove()
      },
      exportimg(){
        const screenshotTarget = document.querySelector('.dtable');
          html2canvas(screenshotTarget).then(canvas=>{
            const base64image = canvas.toDataURL("image/png")
            let anchor = document.createElement('a')
            anchor.setAttribute('href',base64image)
            anchor.setAttribute('download',"table.png")
            anchor.click()
            anchor.remove()
          })
      },
      exportcsv(){
        let table2excel = new Table2Excel();
        table2excel.export(document.querySelectorAll(".dtable"));
      },
      showexport(){
        this.exp=!this.exp
      },
      changetheme(){
        this.darkmode=!this.darkmode
      },
      delline(){ 
        if(confirm("delete line permanently?")){
          let index = this.data.findIndex((object)=>object==this.objectpers)
          this.data.splice(index,1)
          this.objectpers={}
          this.toberem=false
          if(this.data.length==0) this.disable=false
          this.pagelines(this.currentpage)
        }
      },
      deleteall(){
        if(confirm("Delete all lines?")){
          this.data=[]
          this.objectpers={}
          this.disable=false
          this.toberem=false
          this.pagelines(1)
        }
      },
      removecol(column,index){
        this.headers.forEach(col=>{
          if(column.h1===col.h1){
            this.headers.splice(index,1)
          }
        })
        this.data.forEach(line =>{
          delete line[column.h1]
        })
        if(this.headers.length==1) this.disable=false
      },
      select(value){
        this.objectpers=this.lineinpage[value]
        this.toberem=true
        this.indexsel=value
        // let line = document.getElementsByTagName("tr")
        // Array.from(line).forEach(element => {
        //   element.classList.remove('table-info')
        //   element.classList.remove('selected')
        // })
        // if(this.darkmode) Array.from(line)[value+1].classList.add('table-info')
        // else Array.from(line)[value+1].classList.add('selected')
      },
      addline(){
        if(this.disable || confirm("Once you start adding line you can't add column, proceed?")){
          this.disable=true
          let obj = {}
          this.headers.forEach(element => {
            obj[Object.values(element)] = 'Field'
          })
          this.data.push(obj)
          this.pagelines(this.currentpage)
        }
      },
      addlines(value){
        while(value!=0){
          this.addline()
          value--
        }
      },
      addcol(){
        if(this.headers.length>7) this.disable=true
        else {
          let newcol="NewCol"+this.col
            this.headers.push({h1: newcol})
            this.data.forEach((element) => {
              element[newcol] = 'Field'
            });
            this.col++ 
            if(this.headers.length>7) this.disable=true
          }
      } 
    }
  }
</script>
<style scoped>
  .tablee{
    position: fixed;
    top: 5%;
    right: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* overflow-y: scroll; */
    /* margin: 0;
    margin-top: 20px;
    max-width: 595px;
    width: 75%; */
  }
  .back{
    z-index: 55;
    position: absolute;
    left: -1%;
    top: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .footer{
    width: 100% !important;
  }
  .selected td{
    background-color: grey;
  }
  .config{
    overflow-y: scroll;
  }
  .table::-webkit-scrollbar {
    display: none;
  }
</style>