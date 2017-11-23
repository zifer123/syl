<template>
  <div>
    首页面板
    <el-input placeholder="1111"></el-input>
    <el-button @click="addTab({route: '/WxSet/WxApiSet',title: '微信API设置'})"></el-button>
  </div>
</template>

<script>
  export default {
    methods: {
      test(a=1) {
        console.log(a);
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
          this.$store.commit('changeRightRoutesActive',routeInfo.route);
          this.$store.commit('changeActiveNav',routeInfo.route);// 左边导航
        }else {
//          this.rightRoutesArr.push(routeInfo.route);
          /* 这里会触发计算属性rightRoutesActive的setter操作，不必担心 */
          this.$store.commit('changeRightRoutesActive',routeInfo.route);// 第一次设置，为了active
          this.$store.commit('changeActiveNav',routeInfo.route);// 左边导航
          this.$store.commit('addTab',routeInfo);
        }
      }
    }
  }
</script>
