<template>
  <el-container>
    <el-aside width="201px">
      <el-menu
        :default-active="activeNav"
        background-color="#545c64"
        text-color="#fff"
        unique-opened
        style="height: 100%;"
        active-text-color="#ffd04b">

        <template v-for="firstRoute in newRoutes" v-if="!firstRoute.children">
          <router-link :to="{path: firstRoute.path,query: {dd: new Date().getTime()}}" :key="`${firstRoute.path}`">
            <el-menu-item :key="`${firstRoute.path}`" :index="`${firstRoute.path}`">
              <i :class="firstRoute.icon"></i>
              <span slot="title">{{ firstRoute.title }}</span>
            </el-menu-item>
          </router-link>
        </template>
        <template v-else>
          <el-submenu :key="firstRoute.path" :index="firstRoute.path">
            <template slot="title">
              <i :class="firstRoute.icon"></i>
              <span>{{ firstRoute.title }}</span>
            </template>

            <!-- 判断是否是group -->
            <template v-for="secondRoute in firstRoute.children">
              <template v-if="secondRoute.group">
                <el-submenu :index="`${firstRoute.path}/${secondRoute.path}`" :key="`${firstRoute.path}/${secondRoute.path}`">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{ secondRoute.title }}</span>
                  </template>
                  <!-- 只显示查看和添加，当然，在show为true的情况下 -->
                  <template v-for="thirdRoute in secondRoute.children">
                    <router-link :to="{path: firstRoute.path+'/'+secondRoute.path+'/'+thirdRoute.path,query: {dd: new Date().getTime()}}" :key="`${firstRoute.path}/${secondRoute.path}/${thirdRoute.path}`">
                      <el-menu-item v-show="thirdRoute.show&&thirdRoute.title=='添加'||thirdRoute.title=='查看'" :key="`${firstRoute.path}/${secondRoute.path}/${thirdRoute.path}`" :index="`${firstRoute.path}/${secondRoute.path}/${thirdRoute.path}`">
                        <i class="el-icon-menu"></i>
                        <span slot="title">{{ thirdRoute.title }}</span>
                      </el-menu-item>
                    </router-link>
                  </template>
                </el-submenu>
              </template>
              <template v-else>
                <router-link :to="{path: firstRoute.path+'/'+secondRoute.path,query: {dd: new Date().getTime()}}" :key="`${firstRoute.path}/${secondRoute.path}`">
                  <el-menu-item v-show="!secondRoute.hidden" :key="`${firstRoute.path}/${secondRoute.path}`" :index="`${firstRoute.path}/${secondRoute.path}`">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{ secondRoute.title }}</span>
                  </el-menu-item>
                </router-link>
              </template>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
    <el-main>
      <el-row class="bread-crumb">
        <el-col :span="18">
          <transition-group name="el-zoom-in-top">
            <template v-for="(item,index) in breadcrumb" v-text="i">
              <el-button type="text" disabled v-text="item" :key="item"></el-button>
              <!-- 判断最后一个不用加 -->
              <i v-show="index!=breadcrumb.length-1" :key="item" class="el-icon-arrow-right"></i>
            </template>
          </transition-group>
        </el-col>
        <el-col :span="6" class="rightHeader">
          <el-tooltip placement="top" effect="light">
            <div slot="content">
              <div style="border-bottom: 1px solid #ccc;">
                <el-button type="text">查看信息</el-button>
              </div>
              <div>
                <el-button @click="logout" type="text">退出</el-button>
              </div>
            </div>
            <el-tag>Admin <i class="el-icon-arrow-down"></i></el-tag>
          </el-tooltip>
          <el-tooltip placement="top">
            <div slot="content">
              全屏展示
            </div>
            <i :class="isFullScreen?'iconfont icon-unFullScreen':'iconfont icon-fullScreen'" style="cursor: pointer;font-size: 20px;" @click="changeFullScreen"></i>
          </el-tooltip>
        </el-col>
      </el-row>
      <router-view style="padding: 10px 2px;" :key="routeKey"></router-view>
    </el-main>
  </el-container>
</template>

<script>
  import { mapState,mapMutations } from 'vuex'
  // 引入全屏插件
  import screenfull from 'screenfull'
  export default {
    data() {
      return {
        activeNav: '',
        newRoutes: [],
        // 控制是否全屏图标展示
        isFullScreen: false
      }
    },
    component: {
      screenfull
    },
    methods: {
      addTab(routeInfo) {
        // 路由还是组件跳，因为vuex只管状态，切记
        this.$router.push({
          path: routeInfo.route
        });
        let mark = false;
        console.log(this.$store.state.rightRoutes);
        for(let i = 0;i<this.$store.state.rightRoutes.length;i++) {
          if(this.$store.state.rightRoutes[i].name == routeInfo.route) {
            mark = true;
            break;
          }
        }
        /* 判断右边路由标签有没有 */
        if(mark) {
          /* 已存在，直接active,这里会触发计算属性rightRoutesActive的setter操作，不必担心 */
          this.rightRoutesActive = routeInfo.route;
        }else {
//          this.rightRoutesArr.push(routeInfo.route);
          /* 这里会触发计算属性rightRoutesActive的setter操作，不必担心 */
          this.rightRoutesActive = routeInfo.route;// 第一次设置，为了active
          this.$store.commit('addTab',routeInfo);
        }
      },
      clickTab(tab) {
        /*这里会触发计算属性activeNav的setter操作，不必担心*/
        this.activeNav = tab.name;
        this.$router.push({
          path: tab.name
        });
      },
      removeTab(tab) {
        /* tab（tab的name） */
        if(tab == '/') {
          this.$message({
            showClose: true,
            message: '首页不允许关闭',
            type: 'warning'
          });
        }else {
          this.$store.commit('removeTab',tab);
          /* 判断关闭的是否是active */
          if(this.rightRoutesActive == tab) {
            /* 如果关闭的是处于active的，则让arr最后一个变成active */
            this.rightRoutesActive = this.$store.state.rightRoutes[this.$store.state.rightRoutes.length-1].name;
            this.$router.push(this.$store.state.rightRoutes[this.$store.state.rightRoutes.length-1].name);
          }
        }
      },
      // 登出
      logout() {
        localStorage.removeItem('routes');
        localStorage.removeItem('newRoutes');
        location.href = 'login.html';
      },
      //  控制是否全屏
      changeFullScreen() {
        this.isFullScreen = !this.isFullScreen;
        screenfull.toggle();
      }
    },
    computed: {
      routeKey() {
        console.log(this.$route.path+new Date().getTime());
        return this.$route.path+new Date().getTime()
      },
      breadcrumb() {
        return this.$store.state.breadcrumb
      }
    },
    created() {
      let newRoutes = localStorage.getItem('newRoutes');
      /* 初始化菜单 */
      this.newRoutes = JSON.parse(newRoutes);
    }
  }
</script>

<style scoped>
  a {
    display: inline-block;
    width: 100%;
    text-decoration: none;
  }
  .el-main {
    padding: 0;
    position: relative;
  }
  .el-container {
    height: 100%;
  }
  .el-menu .iconfont {
    color: #f5f5f5;
  }
  .bread-crumb {
    display: flex;
    height: 60px;
    align-items: center;
    border-bottom: 1px solid #ccc;
  }
  /* 控制右边头部间距 */
  .rightHeader .el-tooltip {
    margin: 0 4px;
  }
</style>
