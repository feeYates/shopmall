<template>
  <div class="bottom-bar">
    <div class="check-container" @click="checkClick">
       <check-button class="check-all" :isChecked="isSelectedAll"/>
       <span>全选</span>
    </div>

    <div class="total-price">
      合计: {{totalPrice}}
    </div>
    
    <div class="calculate" @click="calcClick">
      去结算({{checkedLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'

export default {
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0)
    },
    checkedLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectedAll() {
      if(this.cartList.length === 0) return false
      
      // 使用filter
      // return !(this.cartList.filter(item => !item.checked).length)
      
      // 使用find
      // return !this.cartList.find(item => !item.checked)
      
      // 使用遍历
      for(let item of this.cartList) {
        if(!item.checked) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectedAll) { //全部选中
        this.cartList.forEach(item => item.checked = false)
      }else {  //部分或者全部不选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if(!this.checkedLength) {
        this.$toast.show('请选择购买的商品', 2000)
        console.log(this)
      }
    }
  },
}
</script>

<style lang="css" scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;
    
    font-size: 14px;
    background-color: #eee;
  
  }
  .check-container{
    display: flex;
    align-items: center;
    align-content: center;
    margin-left: 10px;
  }
  .check-all {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .total-price {
    margin-left: 25px;
    flex: 1;
  }
  .calculate {
    width: 90px;
    background-color: orangered;
    color: #fff;
    text-align: center;
  }
</style>