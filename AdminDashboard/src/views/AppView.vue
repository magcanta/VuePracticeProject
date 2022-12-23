<template>
  <el-container id="app-container">
    <app-side-bar></app-side-bar>
    <el-container direction="vertical">
      <app-header></app-header>
      <app-main>
        <router-view></router-view>
      </app-main>
      <app-footer> </app-footer>
    </el-container>
  </el-container>
</template>

<script>
import AppSideBar from "@/components/AppSideBar/AppSideBar.vue";
import AppHeader from "@/components/AppHeader/AppHeader.vue";
import AppMain from "@/components/AppMain.vue";
import AppFooter from "@/components/AppFooter/AppFooter.vue";

export default {
  name: "app-view",
  components: {
    AppMain,
    AppHeader,
    AppSideBar,
    AppFooter,
  },
};
</script>
