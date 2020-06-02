import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'
import {BACK_POSITION} from 'common/const'

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

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isBackTopShow: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    listeneShowBackTop(position) {
      this.isBackTopShow = -position.y > BACK_POSITION
    }
  },
}