<template>
  <div style="height: 100%;">
    <view-box>
      <x-header style="width: 100%;position: absolute;left: 0px;top: 0px;z-index: 100;">
        时运来物流
        <img slot="right" style="top: 7px;" src="./assets/imgs/scan.png" alt="">
      </x-header>
      <transition :name="transitionName">
        <router-view class="child-view"></router-view>
      </transition>
    </view-box>
  </div>
</template>

<script>
  import { XHeader,ViewBox  } from 'vux'
  export default {
    data() {
      return {
        transitionName: 'slide-left'
      }
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    },
    components: {
      XHeader,
      ViewBox
    }
  }
</script>

<style>
  .child-view {
    position: relative;
    top: 0;
    left: 0;
    top: 46px;
    width: 100%;
    height: 100%;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    transition: all .6s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(-80px, 0);
    transform: translate(-80px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .vux-header .vux-header-right {
    top: 7px !important;
  }
</style>
