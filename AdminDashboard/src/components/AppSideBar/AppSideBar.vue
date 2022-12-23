<template>
  <el-aside width="150px">
    <div>
      <img src="@/assets/logo.svg" />
    </div>
    <el-menu
      :default-active="'/'"
      class="el-menu-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
    >
      <el-menu-item index="/">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">Dashboard</span>
        </template>
      </el-menu-item>
      <el-menu-item index="about">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">Info</span>
        </template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "app-side-bar",
};
</script>

<style scoped>
.el-aside {
  background-color: aquamarine;
  z-index: 2000;
}

.el-aside div img {
  width: 50px;
  height: 50px;
}
.el-aside div {
  width: 150px;
  height: 60px;
  place-content: center;
  display: flex;
  align-items: center;
}

.el-menu {
  border-right: none;
}
.el-menu-item.is-active {
  border-right: 2px solid rgb(255, 208, 75);
}
</style>
