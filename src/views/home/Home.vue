<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center" >魔窟街</div>
    </nav-bar>
    <tab-control :titles="titles"
                   @TabClick="tabClick"
                   ref="tabControl1"
                   class="tab-control"
                   v-show="isTabFixed"
                   />
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentSroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
            >
      <home-swiper :bannerLists="bannerLists" 
                   class="home-swiper"
                   @homeSwiperLLoad="homeSwiperLLoad"
                   ></home-swiper>
      <recommend-view :recommendLists="recommendLists" class="home-recommend"></recommend-view>
      <feature-View></feature-View>
      <tab-control :titles="titles"
                   @TabClick="tabClick"
                   ref="tabControl2"
                   />
      <goods-list :goods="showGoodsType"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isBackTopShow"></back-top>


  </div>
</template>

<script>
  import HomeSwiper from './subComponent/HomeSwiper'
  import RecommendView from './subComponent/RecommendView'
  import FeatureView from './subComponent/FeatureView'
  
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodList'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils'
  export default {
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        bannerLists: [],
        recommendLists: [],
        titles: ['流行', '新款', '精选'],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        goodsType: 'pop',
        isBackTopShow: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    created() {
      // 1.请求多个数据(banner)
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      // 监听item中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      this.$bus.$on('itemImgLoad', () => {
        // this.$refs.scroll.refresh()
        // console.log('---')
        refresh()
      })
      
    },
    destroyed() {
      console.log('home destoryed')
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    computed: {
      showGoodsType() {
        return this.goods[this.goodsType].list
      }
    },
    methods: {
      /**
       * 事件监听方法
       */
      tabClick(index) {
        switch(index) {
          case 0:
            this.goodsType = 'pop'
            break
          case 1: 
            this.goodsType = 'new'
            break
          case 2: 
            this.goodsType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0, 2000)
      },
      contentSroll(position) {
        /*if(-position.y > 1000) {
          this.isBackTopShow = true;
        }else {
           this.isBackTopShow = false;
        } */
        // 1. 判断BackTop是否显示
        this.isBackTopShow = -(position.y) > 1000

        // 2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = -(position.y) > this.tabOffsetTop
      },
      loadMore() {
        // console.log('加载更多')
        this.getHomeGoods(this.goodsType);
        // 完成上拉加载更多
        this.finishPullUp();
      },
      finishPullUp() {
        this.$refs.scroll.finishPullUp()
      },
      homeSwiperLLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /**
       * 数据请求
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
        // console.log(res)
        this.bannerLists = res.data.banner.list;
        this.recommendLists = res.data.recommend.list;
        
        })
      },
      getHomeGoods(type) {
        const goodspage = this.goods[type].page + 1;
        getHomeGoods(type, goodspage).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1;
        })
      }
    }
  }
</script>

<style scoped>  
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  
  }

  /* 方案一 */
  .content {
    overflow: hidden;

    position: absolute;
    top: 40px;
    right: 0;
    left: 0;
    bottom: 49px;
  }

  /* 方案二 */
  /*.content {
    height: calc(100% - 89px);
    overflow: hidden;
  } */
  .home-recommend {
    background-color: #fff;
  }
  .tab-control {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>