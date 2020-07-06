<template>
  <scroll class="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item"
           v-for="(item, index) in sorts" 
           :class="{active:index === currentIndex}"
           :key="index"
           @click="itemClick(index)">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

export default {
  components: {
    Scroll
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    sorts: {
      type: Array,
      dafault() {
        return []
      }
    } 
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('selectItem', index)
    }
  },
}
</script>

<style lang="css" scoped>
  .tab-menu {
    width: 100px;
    height: 100%;
    background-color: #f6f6f6;
    box-sizing: border-box;
    margin-top: 2px;
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }
  
  .active {
    color: var(--color-high-text);
    font-weight: 700;
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);

  }
</style>