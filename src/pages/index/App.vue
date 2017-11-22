<template>
  <el-container>
    <el-header>头部,{{ rightRoutesActive }}  {{ this.$store.state.num }}</el-header>
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
            <el-menu-item :key="`${firstRoute.path}`" :index="`${firstRoute.path}`" @click.native="addTab({route: `${firstRoute.path}`,title: firstRoute.title})">
              <span slot="title">{{ firstRoute.title }}</span>
            </el-menu-item>
          </template>
          <template v-else>
            <el-submenu :key="firstRoute.path" :index="firstRoute.path">
              <template slot="title">
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
                    <el-menu-item v-for="thirdRoute in secondRoute.children" v-show="thirdRoute.show&&thirdRoute.title=='添加'||thirdRoute.title=='查看'" :key="`${firstRoute.path}/${secondRoute.path}/${thirdRoute.path}`" :index="`${firstRoute.path}/${secondRoute.path}/${thirdRoute.path}`" @click.native="addTab({route: `${firstRoute.path}/${secondRoute.path}/${thirdRoute.path}`,title: `${secondRoute.title}/${thirdRoute.title}`})">
                      <i class="el-icon-menu"></i>
                      <span slot="title">{{ thirdRoute.title }}</span>
                    </el-menu-item>
                  </el-submenu>
                </template>
                <template v-else>
                  <el-menu-item v-show="!secondRoute.hidden" :key="`${firstRoute.path}/${secondRoute.path}`" :index="`${firstRoute.path}/${secondRoute.path}`" @click.native="addTab({route: `${firstRoute.path}/${secondRoute.path}`,title: secondRoute.title})">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{ secondRoute.title }}</span>
                  </el-menu-item>
                </template>
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <el-tabs class="fixedTab" v-model="rightRoutesActive" type="card" closable @tab-click="clickTab" @tab-remove="removeTab">
          <el-tab-pane
            v-for="(item, index) in rightRoutes"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
          </el-tab-pane>
        </el-tabs>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
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
      }
    },
    computed: {
      /* 获取vuex的状态,给要时时可变的状态定义setter,要在vuex中定义mutaions改变状态，符合vuex逻辑 */
      activeNav: {
        get() {
          return this.$store.state.activeNav;
        },
        set(newVal) {
          this.$store.commit('changeActiveNav',newVal);
        }
      },
      rightRoutesActive: {
        get() {
          return this.$store.state.rightRoutesActive;
        },
        set(newVal) {
          this.$store.commit('changeRightRoutesActive',newVal);
        }
      },
      rightRoutes() {
        return this.$store.state.rightRoutes;
      }
    },
    created() {
      let newRoutes = sessionStorage.getItem('newRoutes');
      /* 初始化菜单 */
      this.newRoutes = JSON.parse(newRoutes);
      console.log(this.newRoutes);
      /* 第一次应该路由加载的是 */
//      this.$router.push('/home/dashBoard');
    }
  }
</script>

<style>
  .el-main {
    background: #f5f5f5;
    padding: 0;
    position: relative;
  }
  .fixedTab {
    position: sticky;
    top: 0;
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
  .iconfont {
    color: #f5f5f5 !important;
  }
</style>
