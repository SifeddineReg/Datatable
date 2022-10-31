<template>
  <div class="tables">
    <buttons @logout="logout" @createnew="createnew"/>
    <div class="tablecards">
      <div class="tcard" v-for="(name,index) in table" @click="redirectable(index)">
        <tablecard  :title="name.name" :time="name.timestamp" />
      </div>
    </div>
  </div>
</template>

<script>
import tablecard from './tablecard.vue'
import buttons from './buttons.vue'
import { Firestore, auth } from '../firebase/config.js'
import { collection, getDocs, where, query, setDoc, doc} from "firebase/firestore"
import { signOut } from 'firebase/auth'

const tables = collection(Firestore,'tables')

export default {
  data(){
    return {
      user: null,
      ids: [],
      table: [],
      idtbs: ''
    }
  },
  components:{
    tablecard,
    buttons
  },
  methods: {
    redirectable(value){
      let idt = this.ids[value]
      this.$emit('nobackgroundimg',"no")
      this.$router.push({name: 'maker', params: {id: idt, name:"maker"}}).catch(()=>{})
    },
    async createnew(value){
      await setDoc(doc(tables),{
        'columns': [],
        'lines': [],
        'name': value,
        'user': this.user.uid,
        'timestamp': new Date().toLocaleDateString(),
        'tablecolor': "lightskyblue",
        'linesperpage': 10
      }).then(()=>{
        alert('added')
      })
      this.load()
    },
    logout(){
      signOut(auth)
      auth.onAuthStateChanged(() => {
        this.$router.push('home').catch(()=>{})
      })
    },
    async load(){
      const q = query(tables, where('user','==',this.user.uid))
      const docs = await getDocs(q)
      docs.forEach((doc)=>{
        if(!this.ids.includes(doc.id)){
          this.ids.push(doc.id)
          this.table.push(doc.data())
        } 
      })
    }
  },
  created(){
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.user = user;
        this.load()
      } else {
        this.$router.push('home').catch(()=>{})
      }
    })
  },
}
</script>

<style scoped>
  .tables{
    margin-top: 100px;
  }
  .tcard{
    height: 110px;
  }
  .buttons{
    position: absolute;
    right: 0;
    top: 0;
  }
  .tablecards{
    min-width: 500px;
    min-height: 500px;
    position: fixed;
    top: 15%;
    right: 3%;
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    flex-wrap: wrap;
    max-width: 670px;
    max-height: 500px;
    overflow-y: scroll;
  }
  .tablecards::-webkit-scrollbar{
    display: none;
  }
  .tablecards div{
    margin-right: 15px;
    margin-bottom: 10px;
  }
  @media only screen and (max-width: 680px) {
    .tablecards {
      overflow-y: scroll;
    }
  }
  @media only screen and (max-width: 360px) {
    .tablecards {
      overflow-y: scroll;
      position: fixed;
      right: 10%;
    }
  }
</style>