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
      name: '首页',
      path: '/',
      icon: 'iconfont icon-home'
    }
  ],// 保存路由和title
  breadcrumb: [], //存储面包屑导航,
  index: '' //保存索引
};

const mutations = {
  // 添加右边导航
  addRightRoutes(state,routeInfo) {
    /* 限制只保存最近的7个，除了首页！ */
    // if(state.rightRoutes.length >= 8) {
    //   // 删除第二个
    //   state.rightRoutes.splice(1,1);
    // }
    state.rightRoutes.push(routeInfo);
    this.commit('changeActiveNav',routeInfo.path);
  },
  // 改变左边路由选中状态
  changeActiveNav(state,activeNav) {
    state.activeNav = activeNav;
  },
  removeTab(state,routeInfo,isActive) {
    alert(routeInfo)
    alert(isActive)
    let index = state.rightRoutes.indexOf(routeInfo);
    state.rightRoutes.splice(index,1);
    if(isActive) {
      alert(index);
      state.index = index;
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
