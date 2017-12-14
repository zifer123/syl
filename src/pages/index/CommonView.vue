<template>
  <!--<transition name="el-zoom-in-center">-->
  <div>
    <transition name="el-zoom-in-center">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="el-zoom-in-center">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>

    <!--<keep-alive>-->
      <!--<router-view></router-view>-->
    <!--</keep-alive>-->
  <!--</transition>-->
</template>

<script>
  export default {

  }
</script>


