<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      routes: []
    }
  },
  created() {

  }
}
</script>

<style>
  html,body {
    height: 100%;
  }
  #app {
    height: 100%;
  }
</style>
