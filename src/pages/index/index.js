// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
Vue.use(Router)
import routes from './router'

Vue.config.productionTip = false

/* 判断是否登录过 */
if(localStorage.getItem('routes')) {
  alert('拿到权限');
  let personalRoutes = localStorage.getItem('routes');
  personalRoutes = JSON.parse(personalRoutes);
  let newRoutes = routes.filter(function (item) {
    for(let i=0;i<personalRoutes.length;i++) {
      if(item.path == personalRoutes[i].path) {
        item.meta = personalRoutes[i].meta;
        return true;
        break;
      }
    }
  });
  console.log(newRoutes);
  let router = new Router({
    routes: newRoutes
  });
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  });
}else {
  location.href='login.html';
}


