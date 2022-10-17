import Vue from 'vue'
import VueRouter from 'vue-router'
import tables from '../components/dsptables.vue'
import home from '../components/signlog.vue'
import maker from '../components/tablemaker.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    alias: '/home',
    component: home
  },
  {
    path: '/tables',
    name: 'tables',
    component: tables
  },
  {
    path: '/maker',
    name: 'maker',
    component: maker
  },
]

const router = new VueRouter({
  routes
})

export default router
