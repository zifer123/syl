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
      <el-row>
        <div class="rightNavigation">
          <transition-group name="el-zoom-in-center">
              <span class="z-tag" :class="$route.path == item.path?'active' : ''" v-for="(item,index) in rightRoutes" @click="changeRoute(item)" v-show="index <= 8" :key="item.path">
                <i :class="item.icon"></i>
                {{ item.name }}
                <i @click.stop="removeTab(item,$route.path == item.path?true:false)" class="el-icon-close"></i>
              </span>
          </transition-group>
          <el-tooltip v-if="rightRoutes.length >= 9" effect="dark" placement="bottom">
            <div slot="content">
              <div v-for="item in rightRoutes" style="margin: 5px 0;">
                  <span class="z-tag" :class="$route.path == item.path?'active' : ''" @click="changeRoute(item)">
                    <i :class="item.icon"></i>
                    {{ item.name }}
                    <i @click.stop="removeTab(item,$route.path == item.path?true:false)" class="el-icon-close"></i>
                  </span>
              </div>
            </div>
            <span class="z-tag" style="border: 1px solid #ffba00;">标签选项 <i class="el-icon-arrow-down"></i></span>
          </el-tooltip>
        </div>
      </el-row>

      <!-- 解决路由调到首页又跳到其他路由，其他路由缓存消失的情况，按照我理解，就是，可能，因为全部一级路由都是挂载这个router-view显示的，当重新跳到首页时，因为二三级router-view没有经过显示，所以系统把缓存清除掉，为什么二级路由不会清楚，因为引用了同一个commonView.vue，所以不会，当第一级router-view加上keep-alive之后，因为是从缓存读取的，所以不会存在router-view正则深度匹配过程 -->
      <keep-alive>
        <router-view style="padding: 10px 2px;"></router-view>
      </keep-alive>
      <!--<router-view style="padding: 10px 2px;"></router-view>-->
      <!--<router-view style="padding: 10px 2px;" :key="routeKey"></router-view>-->
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
      changeRoute(routeInfo) {
        this.$router.push({
          path: routeInfo.path,
          query: {
            dd: routeInfo.dd
          }
        });
        this.$store.commit('changeActiveNav',routeInfo.path);
      },
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
      removeTab(routeInfo,isActive) {
        /*
         * routeInfo：  路由信息
         * isActive：是否处于选中状态
         * */
        /* 首页不删除 */
        if(routeInfo.path == '/') {
          this.$message({
            type: 'warning',
            message: '首页不删除'
          });
          return;
        }
        this.$store.commit('removeTab',routeInfo);
        if(isActive) {
          let routeInfo = this.$store.state.rightRoutes[this.$store.state.index];
          this.$store.commit('changeActiveNav',routeInfo.path);
          this.$router.push({
            path: routeInfo.path,
            query: {
              dd: new Date().getTime()
            }
          });
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
      // 右边面包屑
      breadcrumb() {
        return this.$store.state.breadcrumb;
      },
      // 右边路由
      rightRoutes() {
        return this.$store.state.rightRoutes;
      },
      // 左边导航active状态
      activeNav() {
        return this.$store.state.activeNav;
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

  /* 右边导航 */
  .rightNavigation {
    background: #F0F0F0;
    padding: 5px;
    border-radius: 5px;
  }
  .z-tag {
    height: 32px;
    line-height: 30px;
    padding: 5px 10px;
    background: #fff;
    color: #495060;
    margin: 0 5px;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
    transition: all .5s linear;
  }
  .z-tag:hover {
    background: #545C64;
    color: #fff;
  }
  .z-tag.active {
    background: #545C64;
    color: #fff;
  }
  .z-tag .el-icon-close {
    z-index: 2;
    transition: all .5s linear;
  }
  .z-tag .el-icon-close:hover {
    color: #f00;
    background: #fff;
    border-radius: 50%;
  }
</style>
