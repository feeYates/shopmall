<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar v-show="isShowTabBar"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";
import router from "./router";

export default {
  name: "App",
  router,
  data() {
    return {
      isShowTabBar: true,
      loginPath: "/login",
      cartPath: '/shopcart'
    };
  },
  components: {
    MainTabBar
  },
  watch: {
    $route() {
      if (this.$route.path === this.loginPath) {
        this.isShowTabBar = false;
      } else if (this.$route.path === this.cartPath) {
        this.isShowTabBar = false;
      } else {
        this.isShowTabBar = true;
      }
    }
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
