<template>
  <div id="tab-content-detail">
    <grid-view>
       <good-list-item v-for="(item, index) in sortDetail" 
                       :key="index"
                       :goodsItem="item"></good-list-item>
    </grid-view>
  </div>
</template>

<script>
import GridView from 'components/common/gridView/GridView'
import GoodListItem from 'components/content/goods/GoodListItem'

export default {
  props: {
    sortDetail: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
   
  },
  components: {
    GridView,
    GoodListItem
  }
}
</script>

<style lang="css" scoped>
  
</style>