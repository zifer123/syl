/**
 * Created by Administrator on 2017/10/31.
 */
import  Vue from 'vue'
new Vue({
  el: "#app",
  template: `<div>
    <input type="text" placeholder="用户名">
    <input type="password" placeholder="密码">
    <button @click="register">提交</button>
  </div>`,
  methods: {
    register() {
      let routes = [
        {
          path: '/',
          meta: ['add','delete','query','edit'],
          title: '主页'
        },
        {
          path: '/admin',
          meta: ['add'],
          title: '管理员页面'
        }
      ];
      localStorage.setItem('routes',JSON.stringify(routes));
      location.href = 'index.html';
    }
  }
})
