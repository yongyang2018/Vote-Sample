import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import store from './store'
import Web3 from 'web3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))

if (!web3) {
  console.error('Unable to connect to ethereum node')
}

new Vue({
  store,
  web3,
  render: h => h(App)
}).$mount('#app')
