/**
 * Created by Administrator on 2017/11/16.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Loading } from 'element-ui';
Vue.use(Vuex)

let loadingInstance = Loading.service({
  lock: true,
  spinner: 'el-icon-loading',
  text: '初次加载，请耐心等待！'
});
/* 在vuex存储不会变的东西，可以减少http请求 */
let addressInfo = [];
axios.get('/api/addressInfo').then(function(body) {
  loadingInstance.close();
  addressInfo.push(...body.data);
});
const state = {
  activeNav: '/',
  addressInfo,// 省市区街道
  rightRoutes: [
    {
      title: '首页',
      name: '/'
    }
  ],// 保存路由和title
  rightRoutesActive: '/',
  breadcrumb: [] //存储面包屑导航
};

const mutations = {
  /* 改变右边路由active状态 */
  changeRightRoutesActive(state,route) {
    state.rightRoutesActive = route;
  },
  /* 改变左边导航的active状态 */
  changeActiveNav(state,nav) {
    state.activeNav = nav;
  },
  /* 添加右边路由数组的信息 */
  addTab(state,routeInfo) {
    state.rightRoutes.push({
      title: routeInfo.title,
      name: routeInfo.route
    });
  },
  removeTab(state,tab) {
    for(let i = 0;i<state.rightRoutes.length;i++) {
      if(state.rightRoutes[i].name == tab) {
        state.rightRoutes.splice(i,1);
        break;
      }
    }
  },
  changeBreadcrumb(state,arr) {
    state.breadcrumb = arr;
  }
};

export default new Vuex.Store({
  state,
  mutations
})
