<template>
  <el-container>
    <el-header>头部</el-header>
    <el-container>
      <el-aside>
        <el-menu
          default-active="2"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu v-for="item in newRoutes" :key="item.path" :index="item.path">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item v-for="ite in item.children" :key="ite.path" :index="ite.path" @click.native="addTab(`/${item.path}/${ite.path}`,ite.title)">
              <i class="el-icon-menu"></i>
              <span slot="title">{{ ite.title }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <p>路由</p>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        newRoutes: []
      }
    },
    methods: {
      addTab(route,title) {
        this.$router.push({
          path: route,
          query: {}
        })
        console.log(title);
      }
    },
    created() {
      let newRoutes = localStorage.getItem('newRoutes');
      this.newRoutes = JSON.parse(newRoutes);
    }
  }
</script>
