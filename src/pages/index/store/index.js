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
  breadcrumb: [] //存储面包屑导航,
};

const mutations = {
  changeBreadcrumb(state,arr) {
    state.breadcrumb = arr;
  },
  // 改变左边路由选中状态
  changeActiveNav(state,activeNav) {
    state.activeNav = activeNav;
  },
};

export default new Vuex.Store({
  state,
  mutations
})
