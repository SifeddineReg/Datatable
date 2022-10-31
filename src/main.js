import Vue from 'vue'
import App from './App.vue'
import router from './router'
import table2excel from 'table2excel'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
