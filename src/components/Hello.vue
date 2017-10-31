<template>
  <div>
    首页
    <button @click="logout">退出登录</button>
  </div>
</template>

<script>
  export default {
    methods: {
      logout() {
        localStorage.removeItem('routes');
        location.href='login.html';
      }
    },
    created() {
      console.log(this.$route.meta);
    }
  }
</script>
