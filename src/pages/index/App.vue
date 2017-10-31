<template>
  <div id="app">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu v-for="route in routes" :index="route.title">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ route.title }}</span>
              </template>
              <el-menu-item v-for="item in route.children" :index="item.path">
                {{ item.title }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

</style>
