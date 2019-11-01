// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'lib-flexible'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App'
import router from './router'

Vue.use(ElementUI)


import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.prototype.$http = axios
Vue.prototype.$URL = 'http://127.0.0.1:3000'

import all from './all.js'
Vue.use(all)

import header from '@/components/header'
Vue.component('my-header',header)
import souSuo from '@/components/souSuo'
Vue.component('my-sousuo',souSuo)

Vue.config.productionTip = false

import store from './store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
