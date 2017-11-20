<template>
  <div>
    首页面板
    <el-input placeholder="1111"></el-input>
    <el-button @click="addNum">测试</el-button>
    <el-button @click="routeTo({route: '/wxSet/wxApiSet',title: '设置'})"></el-button>
  </div>
</template>

<script>
  export default {
    methods: {
      addNum() {
        this.$store.commit('changeNum');
      },
      routeTo(routeInfo) {
        this.$router.push(routeInfo.route);
        this.$store.commit('addTab',routeInfo)
      }
    }
  }
</script>
