<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home">
        <img slot="item-icon" src="~assets/img/tabbar/home.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/home-active.png" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/sort">
        <img slot="item-icon" src="~assets/img/tabbar/sort.png" alt="">
         <img slot="item-icon-active" src="~assets/img/tabbar/sort-active.png" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/shopcart">
        <img slot="item-icon" src="~assets/img/tabbar/shopcar.png" alt="">
         <img slot="item-icon-active" src="~assets/img/tabbar/shopcar-active.png" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="profile">
        <img slot="item-icon" src="~assets/img/tabbar/profile.png" alt="">
         <img slot="item-icon-active" src="~assets/img/tabbar/profile-active.png" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/tabBarItem'

export default {
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>