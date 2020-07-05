<template>
  <div class="shop-cart">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="left" @click="back">
        <img class="back" src="~/assets/img/cart/back.png" alt="">
      </div>
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list/>

    <!-- 商品汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from'./subComponents/CartList'
import CartBottomBar from './subComponents/CartBottonBar'

import { mapGetters } from 'vuex'

export default {
  name: 'shopCart',
  data() {
    return{

    }
  },
  computed: {
    // 两种语法
    ...mapGetters(['cartLength'])
    // ...mapGetters({
    //   length: 'cartLength'
    // })
    /* calccartListLength() {
      return this.$store.getters.cartLength;
    } */
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  },
  components:{
    NavBar,
    CartList,
    CartBottomBar
  }
}
</script>

<style scoped>
.shop-car {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
.nav-bar .back {
  width: 25px;
  height: 25px;
  vertical-align: middle;
}
</style>