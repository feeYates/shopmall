import {debounce} from './utils'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListenner: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    
    this.itemImgListenner = () => {
      refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListenner)
    // console.log('我是混入的内容')
  }
}