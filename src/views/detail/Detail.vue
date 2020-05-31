<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages" class="detail-swiper"/>
      <detail-base-info :goodsInfo="goodsInfo"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imagesLoad="imagesLoad"/>
      <detail-param-info :paramInfo="paramInfo"/>
      <detail-comment-info :commentInfo="commentInfo"/>
    </scroll>
  </div>
</template>
<script>
import {getDetail, GoodsInfo, Shop, GoodsParam} from 'network/detail'

import DetailNavBar from './subCompoents/DetailNavBar'
import DetailSwiper from './subCompoents/DetailSwiper'
import DetailBaseInfo from './subCompoents/DetailBaseInfo'
import DetailShopInfo from './subCompoents/DetailShopInfo'
import DetailGoodsInfo from './subCompoents/DetailGoodsInfo'
import DetailParamInfo from './subCompoents/DetailParamInfo'
import DetailCommentInfo from './subCompoents/DetailCommentInfo'

import Scroll from 'components/common/scroll/Scroll'
export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {}
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
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

      // 获取商品详情信息
      this.detailInfo = data.detailInfo;

      // 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      // 获取评论信息{}
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })  
  },
  methods: {
    imagesLoad() {
      this.$refs.scroll.refresh();
    }
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