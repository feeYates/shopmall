<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in bannerLists" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="homeSwiperLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  // import Swiper from 'components/common/swiper/Swiper'
  // import SwiperItem from 'components/common/swiper/SwiperItem'
  import { Swiper, SwiperItem } from 'components/common/swiper'
  export default {
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      bannerLists: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      homeSwiperLoad() {
        if(!this.isLoad) {
          this.$emit('homeSwiperLLoad');
          this.isLoad = true;
        }
      }
    },
  }
</script>

<style lang="css" scoped>

</style>