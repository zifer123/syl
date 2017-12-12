<template>
  <transition name="el-zoom-in-center">
    <router-view></router-view>
  </transition>
</template>

<script>
  export default {
    created() {
      let arr = [];
      this.$route.matched.forEach((item) => {
        arr.push(item.meta.name);
      });
      this.$store.commit('changeBreadcrumb',arr);
    }
  }
</script>


