<template>
  <el-container>
    <el-header>头部{{ num }},{{ rightRoutesActive }}</el-header>
    <el-container>
      <el-aside width="201px">
        <el-menu
          :default-active="activeNav"
          background-color="#545c64"
          text-color="#fff"
          unique-opened
          style="height: 100%;"
          active-text-color="#ffd04b">
          <el-submenu v-for="item in newRoutes" :key="item.path" :index="item.path">
            <template slot="title">
              <i class="iconfont" :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item v-for="ite in item.children" :key="ite.path" :index="ite.path" @click.native="routeTo({route: `/${item.path}/${ite.path}`,title: ite.title})">
              <i class="el-icon-menu"></i>
              <span slot="title">{{ ite.title }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-tabs class="fixedTab" v-model="rightRoutesActive" type="card" closable @tab-click="clickTab" @tab-remove="removeTab">
          <el-tab-pane name="/home/dashBoard" label="主页面板"></el-tab-pane>
          <el-tab-pane
            v-for="(item, index) in rightRoutes"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
          </el-tab-pane>
        </el-tabs>
        <router-view style="margin-top: 41px;"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import { mapState,mapMutations } from 'vuex'
  export default {
    data() {
      return {
        newRoutes: []
      }
    },
    methods: {
      ...mapMutations(['addTab','clickTab','removeTab']),
      routeTo(routeInfo) {
        this.$router.push(routeInfo.route);
        this.addTab(routeInfo);
      }
    },
    created() {
      let newRoutes = localStorage.getItem('newRoutes');
      /* 初始化菜单 */
      this.newRoutes = JSON.parse(newRoutes);
      /* 第一次应该路由加载的是 */
      this.$router.push('/home/dashBoard');
    },
    computed: {
      ...mapState(['num','rightRoutes','rightRoutesArr','activeNav']),
      rightRoutesActive: {
        get() {
          return this.$store.state.rightRoutesActive;
        },
        set(newValue) {
          this.activeRouter = newValue;
          this.$store.commit('changeRightRoutesActive',newValue)
        }
      }
    }
  }
</script>

<style>
  .fixedTab {
    position: fixed;
    width: 100%;
    z-index: 10;
  }
  .el-tabs__header {
    background: #f5f5f5;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    border-bottom-color: silver;
  }
  .page-header {
    border-bottom: 1px solid #ccc;
  }
  .el-container {
    height: 100%;
  }
  .el-main {
    padding: 0;
  }
  .iconfont {
    color: #f5f5f5 !important;
  }
</style>
