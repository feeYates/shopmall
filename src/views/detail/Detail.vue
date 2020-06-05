<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" 
            ref="scroll"
            @scroll="contentScroll" 
            :probeType="3">
      <detail-swiper :topImages="topImages" class="detail-swiper"/>
      <detail-base-info :goodsInfo="goodsInfo"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imagesLoad="imagesLoad"/>
      <detail-param-info ref="param" :paramInfo="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <good-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backTop" v-show="isBackTopShow"></back-top>
    <!-- <toast :message="msg" :isShowToast="isShowToast"/> -->
  </div>
</template>
<script>
import {getDetail, GoodsInfo, Shop, GoodsParam, getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'

import DetailNavBar from './subCompoents/DetailNavBar'
import DetailSwiper from './subCompoents/DetailSwiper'
import DetailBaseInfo from './subCompoents/DetailBaseInfo'
import DetailShopInfo from './subCompoents/DetailShopInfo'
import DetailGoodsInfo from './subCompoents/DetailGoodsInfo'
import DetailParamInfo from './subCompoents/DetailParamInfo'
import DetailCommentInfo from './subCompoents/DetailCommentInfo'
import DetailBottomBar from './subCompoents/DetailBottomBar'
// import Toast from 'components/common/toast/Toast'

import Scroll from 'components/common/scroll/Scroll'
import GoodList from 'components/content/goods/GoodList'
import { mapActions } from 'vuex'
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
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
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
    DetailBottomBar,
    Scroll,
    GoodList
  },
  mixins: [itemListenerMixin, backTopMixin],
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
        
        // 第一次获取，值不对
        // 值不对的原因：this.$refs.params.$el压根没有渲染
        this.themeTopYs = []

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

        console.log(this.themeTopYs)
      
     /*  this.$nextTick(() => {
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(参数的offsetTop)
        // this.themeTopYs.push(评论的offsetTop)
        // this.themeTopYs.push(推荐的offsetTop)
        
        // 第二次获取，值不对
        // 值不对的原因：图片没有计算在内
        // 根据最新的数据，对应的DOM是已经被渲染出来了
        // 但是图片依然没有加载(目前获取到offsetTop不包含其中的图片)
        // offsetTop值不对的时候，都是因为图片的问题
        this.themeTopYs = []

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

        console.log(this.themeTopYs)
      }) */
      }
    })  
      // 请求推荐数据
    getRecommend().then(res => {
        this.recommends = res.data.list
    })

    // 给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
       this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop - 40)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 40)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 40)
        this.themeTopYs.push(Number.MAX_VALUE)
    })
  },
  mounted() {

  },
  methods: {
    ...mapActions(['addCart']),
    imagesLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position) {
      // 1. 获取y值
      const positionY = -position.y;

      // 2. posttion和主题中的值进行对比
      // [0, 5500, 6310, 6526]
      // positionY 在 0 ~ 5500 之间，index = 0
      // positionY 在 5500 ~ 6310 之间，index = 1
      // positionY 在 6310 ~ 6526 之间，index = 2
      // positionY 超过 6526，index = 3

      // hack做法
      //  [0, 5500, 6310, 6526, Number.MAX_VALUE]
       // positionY 在 0 ~ 5500 之间，index = 0
      // positionY 在 5500 ~ 6310 之间，index = 1
      // positionY 在 6310 ~ 6526 之间，index = 2
      // positionY 在 652 6~ Number.MAX_VALUE，index = 3

      // for(let i = 0; i < this.themeTopYs.length + 1; i++) {
        /* if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
          console.log(i)
        } */
        // const length = this.themeTopYs.length;
       /*  if(this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i])) {
          console.log(i); 
          this.currentIndex = i;  
          this.$refs.nav.currentIndex = this.currentIndex;
        } */
        
        // hack做法：
        for(let i = 0; i < this.themeTopYs.length-1; i++) {
        const length = this.themeTopYs.length
        if(this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i;  
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      } 

      // 是否显示回到顶部
      this.listeneShowBackTop(position)
    },
    // 添加购物车方法
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车 
      // this.$store.cartList.push(product)
      // this.$store.commit('addCart', product)
      
      /*  this.isShowToast = true;
        this.msg = res;

        setTimeout(() => {
          this.isShowToast = false;
          this.msg = ''
        }, 1500) */
      this.addCart(product).then(res => {
        this.$toast.show(res, 1500)
      })

      this.$store.dispatch('addCart', product).then(res => {
        // console.log(res);
      })
     

    }
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListenner)
  },

}
</script>

<style scoped>
  #detail {
    position: fixed;
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
    height: calc(100% - 40px - 49px);
  }
</style>