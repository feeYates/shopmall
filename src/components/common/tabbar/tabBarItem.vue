<template>
<!-- 所有的item都展示同一个图片，同一个文字 -->
  <div class="tab-bar-item"  @click="tabClick">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // isActive: false,
    }
  },
  props: {
   path: String,
   activeColor: {
    default: '#d81e06',
    type: String
   }
  },
  computed: {
    isActive() {
      // home -> item1(/home) = ture
      // home -> item1(/sort) = false
      // home -> item1(/shopcart) = false
      // home -> item1(/profile) = false
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    tabClick() {
      // console.log('tabClick')
      if(this.$router.path === this.path) {
        return
      }else{
        this.$router.replace(this.path).catch(err=> err)
      }
    }
  }
}
</script>

<style lang="css" scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  width: 80px;
  font-size: 14px;
  color: #000;
}

.tab-bar-item img {
  width: 26px;
  height: 26px;
  margin-top: 3px;
  vertical-align: middle;
}


</style>