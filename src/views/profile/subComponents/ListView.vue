<template>
  <div id="list-view">
    <div class="list-item" v-for="(item, index) in DataLists" :key="index">
      <img :src="item.imgSrc" alt />
      <span>{{item.info}}</span>
      <div class="border"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    DataLists: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="css" scoped>
  .list-item {
    height: 45px;
    line-height: 44px;
    background-color: #fff;
  }
  .border {
    margin-left: 10%;
    border-bottom: 1.5px solid #f2f2f2;
  }
  .list-item img {
    width: 20px;
    height: 20px;
    margin: auto 10px;
  }
</style>