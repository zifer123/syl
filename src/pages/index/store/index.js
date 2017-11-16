/**
 * Created by Administrator on 2017/11/16.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  activeNav: '/home/dashboard',
  rightRoutes: [
    {
      title: '主页面板',
      name: '/home/dashBoard'
    }
  ],// 保存路由和title
  rightRoutesActive: '/home/dashBoard'
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
  }
};

export default new Vuex.Store({
  state,
  mutations
})
