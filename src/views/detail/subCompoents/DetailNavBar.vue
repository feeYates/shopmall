<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="../../../assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="detail-nav-title">
        <div v-for="(item, index) in titles" 
             :key="index" 
             class="title-item"
             :class="{active: index === currentIndex}"
             @click="titleClick(index)"
             >
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick', index)
    },
    backClick() {
      // this.$router.go(-1);
      this.$router.back();
    }
  },
}
</script>

<style lang="css" scoped>
  .detail-nav-title {
    display: flex;
  }
  .title-item {
    flex: 1;
    font-size: 14px;
  }
  .active {
    color: var(--color-high-text);
  }
  .back {
    margin-top: 5px;
  }

</style>