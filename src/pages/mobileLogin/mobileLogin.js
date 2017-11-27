/**
 * Created by Administrator on 2017/11/27.
 */
import Vue from 'vue'
import FastClick from 'fastclick'
FastClick.attach(document.body)
import App from './App.vue'

import  { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)

new Vue({
  render: h => h(App)
}).$mount('#app')
