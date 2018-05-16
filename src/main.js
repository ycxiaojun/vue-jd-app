// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import VueTouch from 'vue-touch'
import './assets/flexible.js'

Vue.use(MintUI)
Vue.use(VueTouch, {name: 'v-touch'})
Vue.config.productionTip = false

global.storage = window.localStorage

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
