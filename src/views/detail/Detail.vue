<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"/>
    <scroll class="content">
      <detail-swiper :topImages="topImages" class="detail-swiper"/>
      <detail-base-info :goodsInfo="goodsInfo"/>
      <detail-shop-info :shop="shop"/>
    </scroll>
  </div>
</template>
<script>
import {getDetail, GoodsInfo, Shop} from 'network/detail'

import DetailNavBar from './subCompoents/DetailNavBar'
import DetailSwiper from './subCompoents/DetailSwiper'
import DetailBaseInfo from './subCompoents/DetailBaseInfo'
import DetailShopInfo from './subCompoents/DetailShopInfo'

import Scroll from 'components/common/scroll/Scroll'
export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shop: {}
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid

    // 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 获取顶部的图片轮播数据
      console.log(res)
      const data = res.result
      this.topImages = data.itemInfo.topImages;

      // 获取商品信息
      this.goodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
      
      // 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
    }) 
  }

}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav-bar {
    background-color: #fff;
    position: relative;
    z-index: 9;
  }
  .content {
    height: calc(100% - 40px);
  }
</style>