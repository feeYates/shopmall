<template>
  <div class="recommend-container">
    <div class="recommend-item" v-for="(item, index) in recommendLists" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div class="item-title">{{item.title}}</div>
        </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommendLists: {
      type: Array,
      default() {
        return []
      }
    }

  }
}
</script>

<style lang="css" scoped>
  .recommend-container {
    display: flex;
    width: 100%;
    text-align: center;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
  }
  .recommend-item {
    flex: 1;
  }
  .recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
  .item-title {
    font-size: 12px;
  }
</style>