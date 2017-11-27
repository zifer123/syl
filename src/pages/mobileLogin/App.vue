<template>
  <div>

  </div>
</template>

<script>
  export default {
    methods: {
      isLoading() {
        this.$vux.loading.show({
          text: '正在登陆...'
        })
        setTimeout(function() {
          this.$vux.loading.hide();
        }.bind(this),3000);
      }
    },
    created() {
      this.isLoading();
    }
  }
</script>

<style>

</style>
