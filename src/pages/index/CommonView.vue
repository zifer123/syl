<template>
  <transition name="el-zoom-in-center">
    <router-view></router-view>
  </transition>
</template>

<script>
  export default {
      // 缓存模式不走这里
    created() {
      let arr = [];
      let routeInfo = {
        name: ''
      };
      console.log(this.$route);
      this.$route.matched.forEach((item,index) => {
        arr.push(item.meta.name);
        if(index >= 1 && index != this.$route.matched.length-1) {
          routeInfo.name += item.meta.name+'/';
        }else {
          /* 第一级的名字不需要 */
          if(index >= 1) {
            routeInfo.name += item.meta.name;
          }
        }
        /* 最后一个才是想要存储的路由 */
        if(this.$route.matched.length-1 == index) {
//          /* 第一次没有任何东西 */
//          if(!this.$store.state.rightRoutes.length) {
//            routeInfo.path = item.path;
//            routeInfo.icon = item.meta.icon;
//            this.$store.commit('addRightRoutes',routeInfo);
//          }
          /* 由于第三级（查看，添加等）重复用了同一个commonView.vue,所以会执行两次，这里判断是否有重复的 */
          let rightRoutes = this.$store.state.rightRoutes;
          let rightRoutesLen = rightRoutes.length;
          let mark = false;
          for(let i = 0;i<rightRoutesLen;i++) {
            if(rightRoutes[i].path == item.path) {
              mark = true;
            }
          }
          /* 判断是否重复view */
          if(!mark) {
            routeInfo.path = item.path;
            routeInfo.icon = item.meta.icon;
            this.$store.commit('addRightRoutes',routeInfo);
          }
        }
      });
      this.$store.commit('changeBreadcrumb',arr);
    }
  }
</script>


