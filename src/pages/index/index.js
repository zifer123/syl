// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Router)
Vue.use(ElementUI)
import routes from './router'

Vue.config.productionTip = false

/* 判断是否登录过 */
if(localStorage.getItem('routes')) {
  alert('拿到权限');
  // let personalRoutes = localStorage.getItem('routes');
  // personalRoutes = JSON.parse(personalRoutes);
  // /* 筛选第一级 */
  // let firstRoutes = routes[0].children.filter(function (item) {
  //   for(let i=0;i<personalRoutes.length;i++) {
  //     if(item.path == personalRoutes[i].path) {
  //       item.meta = personalRoutes[i].meta||[];
  //       return true;
  //       break;
  //     }
  //   }
  // });
  // console.log(firstRoutes);
  // /* 先排序，然后比较（比较好比较） */
  // personalRoutes.sort();
  // firstRoutes.sort();
  // /* 筛选第二级 */
  // for(let i=0;i<firstRoutes.length;i++) {
  //   let childrens = firstRoutes[i].children;
  //   for(let j=0;j<childrens.length;j++) {
  //     if(!personalRoutes[j].show) {
  //       /* 把对应的删除掉 */
  //       childrens.splice(j,1);
  //     }
  //   }
  // }
  // /* 赋值是为了比较好理解（得到新路由，最终路由） */
  // let newRoutes = routes;
  // /* 存取，为了循环菜单的那个vue能拿到.vue能获取到 */
  // localStorage.setItem('newRoutes',JSON.stringify(firstRoutes));
  let router = new Router({
    routes: routes
  });
  /* 初始化应用 */
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  });
}else {
  location.href='login.html';
}


