<template>
  <div>
    <div class="logo_bg">
      <div>
        <img class="logo" src="./assets/imgs/logo.png" alt="">
      </div>
      <div>子发</div>
      <div>用户id：12</div>
    </div>
    <group title="常用服务">
      <cell is-link title="货物通告" :link="{ path:'/annunciate' }">
        <img slot="icon" src="./assets/imgs/annunciate.png" alt="">
      </cell>

      <cell is-link title="我的订单" :link="{ path:'/order' }">
        <img slot="icon" src="./assets/imgs/order.png" alt="">
      </cell>

      <cell is-link title="已上车">
        <img slot="icon" src="./assets/imgs/loading.png" :link="{ path:'/annunciate' }" alt="">
      </cell>

      <cell is-link title="已卸货">
        <img slot="icon" style="width: 32px;" src="./assets/imgs/offload.png" :link="{ path:'/annunciate' }" alt="">
      </cell>

      <cell is-link title="未配送">
        <img slot="icon" src="./assets/imgs/undone.png" :link="{ path:'/annunciate' }" alt="">
      </cell>

      <cell is-link title="已配送">
        <img slot="icon" src="./assets/imgs/done.png" :link="{ path:'/annunciate' }" alt="">
      </cell>

      <cell is-link title="退货订单">
        <img slot="icon" src="./assets/imgs/return.png" :link="{ path:'/annunciate' }" alt="">
      </cell>
      <cell is-link title="退货订单">
        <img slot="icon" src="./assets/imgs/return.png" :link="{ path:'/annunciate' }" alt="">
      </cell>
      <cell is-link title="退货订单">
        <img slot="icon" src="./assets/imgs/return.png" :link="{ path:'/annunciate' }" alt="">
      </cell>
      <cell is-link title="退货订单">
        <img slot="icon" src="./assets/imgs/return.png" :link="{ path:'/annunciate' }" alt="">
      </cell>
      <cell is-link title="退货订单">
        <img slot="icon" src="./assets/imgs/return.png" :link="{ path:'/annunciate' }" alt="">
      </cell>
    </group>
  </div>

</template>

<script>
  import { Group,Cell } from 'vux'
  export default {
    components: {
      Group,
      Cell
    }
  }
</script>

<style>
  .logo_bg {
    height: 220px;
    background: #CFE4F5;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: space-around;
  }
  .logo_bg .logo {
    width: 140px;
  }
</style>
