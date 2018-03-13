<template>
  <el-container>
    <el-aside width="204px">
      <el-menu
        :default-active="activeNav"
        background-color="#545c64"
        text-color="#fff"
        unique-opened
        style="height: 100%;width: 201px;"
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
                    <router-link v-if="thirdRoute.show&&thirdRoute.title=='添加'||thirdRoute.title=='查看'" :to="{path: firstRoute.path+'/'+secondRoute.path+'/'+thirdRoute.path,query: {dd: new Date().getTime()}}" :key="`${firstRoute.path}/${secondRoute.path}/${thirdRoute.path}`">
                      <el-menu-item :key="`${firstRoute.path}/${secondRoute.path}/${thirdRoute.path}`" :index="`${firstRoute.path}/${secondRoute.path}/${thirdRoute.path}`">
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
          <transition-group name="rotate">
            <template v-for="(item,index) in breadcrumb">
              <el-button type="text" disabled v-text="item" :key="`${index}${Math.random()}`"></el-button>
              <!-- 判断最后一个不用加 -->
              <i v-show="index!=breadcrumb.length-1" :key="`${index}}`" class="el-icon-arrow-right"></i>
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
      <!-- 解决路由调到首页又跳到其他路由，其他路由缓存消失的情况，按照我理解，就是，可能，因为全部一级路由都是挂载这个router-view显示的，当重新跳到首页时，因为二三级router-view没有经过显示，所以系统把缓存清除掉，为什么二级路由不会清楚，因为引用了同一个commonView.vue，所以不会，当第一级router-view加上keep-alive之后，因为是从缓存读取的，所以不会存在router-view正则深度匹配过程 -->
      <!--<keep-alive>-->
        <!--<router-view style="padding: 10px 2px;"></router-view>-->
      <!--</keep-alive>-->
      <router-view style="padding: 10px 2px;" :key="routeKey"></router-view>
      <!--<router-view style="padding: 10px 2px;"></router-view>-->
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
        newRoutes: [],
        // 控制是否全屏图标展示
        isFullScreen: false
      }
    },
    component: {
      screenfull
    },
    methods: {
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
      // 右边面包屑
      breadcrumb() {
        return this.$store.state.breadcrumb;
      },
      // 左边导航active状态
      activeNav() {
        return this.$store.state.activeNav;
      },
      routeKey() {
        return this.$route.path+new Date().getTime()
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
    height: 50px;
    align-items: center;
    border-bottom: 1px solid #ccc;
  }
  /* 控制右边头部间距 */
  .rightHeader .el-tooltip {
    margin: 0 4px;
  }
  .rotate-enter-active,.rotate-leave {
    transform: translateY(0) rotate(0deg);
    transition: all .9s linear;
  }
  .rotate-enter,.rotate-leave-active {
    transform: translateY(-45px) rotate(180deg);
  }
</style>
