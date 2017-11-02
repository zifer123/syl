<template>
  <el-container>
    <el-header>头部</el-header>
    <el-container>
      <el-aside width="201px">
        <el-menu
          :default-active="activeNav"
          background-color="#545c64"
          text-color="#fff"
          unique-opened
          active-text-color="#ffd04b">
          <el-submenu v-for="item in newRoutes" :key="item.path" :index="item.path">
            <template slot="title">
              <i class="iconfont" :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item v-for="ite in item.children" :key="ite.path" :index="ite.path" @click.native="addTab(`/${item.path}/${ite.path}`,ite.title)">
              <i class="el-icon-menu"></i>
              <span slot="title">{{ ite.title }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-tabs v-model="rightRoutesActive" type="card" closable @tab-click="clickTab" @tab-remove="removeTab">
          <el-tab-pane name="/home/dashBoard" label="主页面板"></el-tab-pane>
          <el-tab-pane
            v-for="(item, index) in rightRoutes"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
          </el-tab-pane>
        </el-tabs>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        activeNav: 'dashBoard',
        newRoutes: [],
        rightRoutes: [],// 保存路由和title
        rightRoutesArr: ['/home/dashBoard'],// 只保存路由,用来判断是否已经存在
        rightRoutesActive: '/home/dashBoard'
      }
    },
    methods: {
      addTab(route,title) {
        this.$router.push({
          path: route,
          query: {}
        });
        /* 判断右边路由标签有没有 */
        if(this.rightRoutesArr.indexOf(route)!=-1) {
          /* 已存在，直接active */
          this.rightRoutesActive = route;
        }else {
          this.rightRoutesArr.push(route);
          this.rightRoutesActive = route;// 第一次设置，为了active
          this.rightRoutes.push({
            title: title,
            name: route
          })
        }
      },
      clickTab(tab) {
        this.activeNav = tab.name.split('/')[2];
        this.$router.push({
          path: tab.name
        });
      },
      removeTab() {
        console.log(2);
      }
    },
    created() {
      let newRoutes = localStorage.getItem('newRoutes');
      /* 初始化菜单 */
      this.newRoutes = JSON.parse(newRoutes);
      /* 第一次应该路由加载的是 */
    }
  }
</script>

<style>
  .page-header {
    border-bottom: 1px solid #ccc;
  }
  .el-main {
    padding: 0;
  }
  .iconfont {
    color: #f5f5f5 !important;
  }
</style>
