<template>
  <div class="wrapper">
     <ul class="content">
       <button @click="btnClick">按钮</button>
       <li>第1个列表</li>
       <li>第2个列表</li>
       <li>第3个列表</li>
       <li>第4个列表</li>
       <li>第5个列表</li>
       <li>第6个列表</li>
       <li>第7个列表</li>
       <li>第8个列表</li>
       <li>第9个列表</li>
       <li>第10个列表</li>
       <li>第11个列表</li>
       <li>第12个列表</li>
       <li>第13个列表</li>
       <li>第14个列表</li>
       <li>第15个列表</li>
       <li>第16个列表</li>
       <li>第17个列表</li>
       <li>第18个列表</li>
       <li>第19个列表</li>
       <li>第20个列表</li>
       <li>第21个列表</li>
       <li>第22个列表</li>
       <li>第23个列表</li>
       <li>第24个列表</li>
       <li>第25个列表</li>
       <li>第26个列表</li>
       <li>第27个列表</li>
       <li>第28个列表</li>
       <li>第29个列表</li>
       <li>第30个列表</li>
       <li>第31个列表</li>
       <li>第32个列表</li>
       <li>第33个列表</li>
       <li>第34个列表</li>
       <li>第35个列表</li>
       <li>第36个列表</li>
       <li>第37个列表</li>
       <li>第38个列表</li>
       <li>第39个列表</li>
       <li>第40个列表</li>
       <li>第41个列表</li>
       <li>第42个列表</li>
       <li>第43个列表</li>
       <li>第44个列表</li>
       <li>第45个列表</li>
       <li>第46个列表</li>
       <li>第47个列表</li>
       <li>第48个列表</li>
       <li>第49个列表</li>
       <li>第50个列表</li>
       <li>第51个列表</li>
       <li>第52个列表</li>
       <li>第53个列表</li>
       <li>第54个列表</li>
       <li>第55个列表</li>
       <li>第56个列表</li>
       <li>第57个列表</li>
       <li>第58个列表</li>
       <li>第59个列表</li>
       <li>第60个列表</li>
       <li>第61个列表</li>
       <li>第62个列表</li>
       <li>第63个列表</li>
       <li>第64个列表</li>
       <li>第65个列表</li>
       <li>第66个列表</li>
       <li>第67个列表</li>
       <li>第68个列表</li>
       <li>第69个列表</li>
       <li>第70个列表</li>
       <li>第71个列表</li>
       <li>第72个列表</li>
       <li>第73个列表</li>
       <li>第74个列表</li>
       <li>第75个列表</li>
       <li>第76个列表</li>
       <li>第77个列表</li>
       <li>第78个列表</li>
       <li>第79个列表</li>
       <li>第80个列表</li>
       <li>第81个列表</li>
       <li>第82个列表</li>
       <li>第83个列表</li>
       <li>第84个列表</li>
       <li>第85个列表</li>
       <li>第86个列表</li>
       <li>第87个列表</li>
       <li>第88个列表</li>
       <li>第89个列表</li>
       <li>第90个列表</li>
       <li>第91个列表</li>
       <li>第92个列表</li>
       <li>第93个列表</li>
       <li>第94个列表</li>
       <li>第95个列表</li>
       <li>第96个列表</li>
       <li>第97个列表</li>
       <li>第98个列表</li>
       <li>第99个列表</li>
       <li>第100个列表</li>
     </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        scroll: null
      }
    },
    created() {
      // 在这里不能获取页面元素，未挂载到页面中
    },
    mounted() {
    
      this.scroll = new BScroll(document.querySelector('.wrapper'), {
        probeType: 3,
        // click: true
        pullUpLoad: true
      })

      this.scroll.on('scroll', (position) => {
        // console.log(position)
      })
      
      this.scroll.on('pullingUp', () => {
        console.log('触发上拉加载更多')

        setTimeout(() => {
          this.scroll.finishPullUp()
        },2000)
      })
    },
    methods: {
      btnClick() {
        console.log('触发点击事件')
      }
    },
  }
</script>

<style scoped>
 .wrapper {
  height: 100px;
  background-color: red;
  
  overflow: hidden;
  /* overflow-y: scroll; */
}
</style>