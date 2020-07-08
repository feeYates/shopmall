<template>
  <div id="profile">
    <nav-bar class="nav-bar">
      <div slot="center">小马哥的商城</div>
    </nav-bar>

    <!-- 1.单独封装一个组件，利用slot -->
    <user-info class="user-info">
      <img slot="user-info" class="privateImage left" :src="this.iconLink" alt />
      <div slot="user-nikename" class="login-text" @click="toLogin">{{loginName}}</div>
      <div slot="user-phone" class="phone-state">{{phoneNumber}}</div>
      <p slot="place-back" v-if="isShowPlaceBack" class="arrow-r right">{{turnBack}}</p>
    </user-info>
      
    <p class="real-back" v-if="isShowBack" @click="toTurnBack">退出</p>
  
    <!--2.没有单独封装: 不同的地方太多, 需要传过多的参数-->
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">{{balances}}</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">{{discounts}}</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">{{intergrals}}</span>分
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
import ListView from "./subComponents/ListView";
import UserInfo from "./subComponents/UserInfo";
import NavBar from "components/common/navbar/NavBar";

import msg from "assets/img/profile/msg.png";
import mall from "assets/img/profile/mall.png";
import vip from "assets/img/profile/vip.png";
import shopcart from "assets/img/profile/shopcart.png";
import download from "assets/img/profile/download.png";

import Vue from 'vue'
import ElementUI from 'element-ui'
// 安装element-ui中的messageBox
Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css';

export default {
  data() {
    return {
      orderList: [
        { info: "我的消息", imgSrc: msg },
        { info: "积分商城", imgSrc: mall },
        { info: "会员卡", imgSrc: vip }
      ],
      serviceList: [
        { info: "我的购物车", imgSrc: shopcart },
        { info: "下载购物App", imgSrc: download }
      ],
      iconLink: 'http://md.justfunit.com/1594139151.png-mycdn',
      phoneNumber: '暂无绑定手机号码',
      loginName: '登录/注册',
      balances: '0.00',
      discounts: 0,
      intergrals:0,
      turnBack: '>',
      isShowBack: false,
      isShowPlaceBack: true
    };
  },
  methods: {
    toLogin() {
      if (this.loginName !== "Yates") {
        this.$router.replace("/login");
      } else {
        this.isShowBack = true;
      }
    },
    changeData() {
      this.iconLink = 'http://md.justfunit.com/1594139151.png-mycdn';
      this.phoneNumber = '暂无绑定手机号码';
      this.loginName = '登录/注册';
      this.balances = '0.00';
      this.discounts = 0;
      this.intergrals = 0;
      this.turnBack = '>';
      this.isShowBack = false;
      this.isShowPlaceBack = true
    },
    toTurnBack() {
      this.$confirm("客官，您确定要退出吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "waring"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功！"
          });
          this.changeData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    }
  },

  created() {
      this.$bus.$on("received", profileData => {
      this.iconLink = profileData.iconLink;
      this.phoneNumber = profileData.phoneNumber;
      this.loginName = profileData.loginName;
      this.balances = profileData.balances;
      this.discounts = profileData.discounts;
      this.intergrals = profileData.intergrals;
      this.turnBack = profileData.turnBack;
      this.isShowPlaceBack = profileData.isShowPlaceBack;
      this.isShowBack = profileData.isShowBack;
    });
  },
  components: {
    NavBar,
    UserInfo,
    ListView
  }
};
</script>

<style>
#profile {
  background-color: #f2f2f2;
}

#profile .nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}

.account {
  display: flex;
  justify-content: space-evenly;
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
.el-message-box__wrapper .el-message-box {
  width: 84vw;
}
.el-message {
  min-width: 84vw;
}

.user-info {
  position: relative;
}
.real-back {
  position: absolute;
  top: 12%;
  right: 5px;
  z-index: 999;
  font-size: 18px;
  color: #fff;
}
</style>