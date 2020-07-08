<template>
  <div id="tab-content-sort">
    <grid-view :cols="3" 
               :lineSpace="15"
               :vMargin="5"
               >
      <div class="item" v-for="(item, index) in subSorts.list" :key="index"> 
        <a :href="item.link" class="item-link">
          <img class="item-img" :src="item.image" alt="">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from 'components/common/gridView/GridView'
export default {
  props: {
    subSorts: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  create() {
    console.log(this.subSorts)
  },
  components: {
    GridView
  }
}
</script>

<style lang="css" scoped>
  .item-link {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .item-img {
    width: 80%;
  }
  .item-text {
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
  }
</style>