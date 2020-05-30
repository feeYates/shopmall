<template>
  <div class="tab-control-container">
    <div class="tab-control-item" 
         v-for="(item, index) in titles" 
         :key="index" 
         :class="{active : index === currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      // console.log(index)s
      this.currentIndex = index;
      this.$emit('TabClick', index);
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .tab-control-container {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
  }
  .tab-control-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text)
  }
  .active span {
    padding: 5px;
    border-bottom: 3px solid var(--color-high-text);
  }
</style>