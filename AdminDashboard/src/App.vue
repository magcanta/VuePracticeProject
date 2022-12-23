<script>
import users from "./assets/user-accounts.json";
import { RouterView } from "vue-router";

var isLogin = false
export default {
  data() {
    return {
      users
    }
  },
}
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>

#app {
  background-color: aliceblue;
  color:black;
  height: 100%;
}
</style>
