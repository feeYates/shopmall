<template>
   <div id="profile">
      <nav-bar class="nav-bar"><div slot="center">小马哥的商城</div></nav-bar>

      <!-- 1.单独封装一个组件，利用slot -->
      <user-info></user-info>

      <!--2.没有单独封装: 不同的地方太多, 需要传过多的参数--> 
      <section class="account">
        <div class="account-item">
          <div class="number">
            <span class="balance">0.00</span>元
          </div>
          <div class="account-info">我的余额</div>
        </div>
        <div class="account-item">
          <div class="number">
            <span class="balance">0</span>个
          </div>
          <div class="account-info">我的优惠</div>
        </div>
        <div class="account-item">
          <div class="number">
            <span class="balance">0</span>分
          </div>
          <div class="account-info">我的积分</div>
        </div>
      </section>

      <!-- 3. 封装成一个整体 -->
      <list-view :data-lists="orderList" class="order-list"></list-view>
      <list-view :data-lists="serviceList"></list-view>
   </div>
</template>

<script>
  import ListView from './subComponents/ListView'
  import UserInfo from './subComponents/UserInfo'
  import NavBar from 'components/common/navbar/NavBar'


  import msg from 'assets/img/profile/msg.png'
  import mall from 'assets/img/profile/mall.png'
  import vip from 'assets/img/profile/vip.png'
  import shopcart from 'assets/img/profile/shopcart.png'
  import download from 'assets/img/profile/download.png' 
  
  export default {
    data() {
      return {
        orderList: [
          {info: '我的消息', imgSrc: msg },
          {info: '积分商城', imgSrc: mall },
          {info: '会员卡', imgSrc: vip },
        ],
        serviceList: [
          {info: '我的购物车', imgSrc: shopcart },
          {info: '下载购物App', imgSrc: download }
        ]
      }
    },
    components: {
      NavBar,
      UserInfo,
      ListView
    }
  }
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }

  .account {
    display: flex;
    justify-content:space-evenly;
    height: 105px;
  }

  .account-item {
    flex: 1;
    text-align: center;
    height: 90px;
    background-color: #fff;
    border-right: 1px solid #f2f2f2;
  }
  .account-item:last-child {
    border: none;
  }
  
  .account-item .number {
    height: 45px;
    line-height: 45px;
  }

  .number .balance {
    font-size: 28px;
    color: #ff5f3e;
    font-weight: 700;
  }
  
  .account-item .account-info {
    font-size: 14px;
  }

  .order-list {
    padding-bottom: 15px;
  }
</style>