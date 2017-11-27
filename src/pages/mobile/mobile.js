import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App.vue'
import Navigation from './Navigation.vue'
import Annunciate from './pages/Annunciate.vue'
import './assets/css/reset.css'

FastClick.attach(document.body)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Navigation
    },
    {
      path: '/annunciate',
      component: Annunciate
    },
  ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
