<template>
  <div>
    首页面板
    <el-input placeholder="1111"></el-input>
  </div>
</template>

<script>
  export default {
    mounted() {
        this.$http.get('/api/users').then((body) => {
            console.log(body);
        });
    }
  }
</script>


