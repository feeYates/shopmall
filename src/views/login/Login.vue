<template>
  <div id="login">
    <div class="login-form">
      <h1>登录</h1>
      <h3 class="tip-text">用户名</h3>
      <input type="text" placeholder="请输入用户名" v-model="username">
      <h3 class="tip-text">密码</h3>
      <input type="password" placeholder="请输入密码" v-model="password">
      <div class="submit" @click="submit">登录</div>
      <div class="login-func">
        <span class="register">账号注册</span>
        <span class="forget">忘记密码?</span>
      </div>
      <p class="other">其他登录方式</p>
      
      <div class="other-icon">
        <img src="~assets/img/login/wechat.png" alt="">
        <img src="~assets/img/login/qq.png" alt="">
        <img src="~assets/img/login/microblog.png" alt="">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'Yates',
      password: '123456',
      profileData: {
        iconLink: 'http://md.justfunit.com/1594140965.jpg-mycdn',
        phoneNumber: '13465466464',
        loginName: 'Yates',
        balances: '999.9',
        discounts: 999,
        intergrals: 99,
        turnBack: '退出',
        isShowPlaceBack: false,
        isShowBack: true
      }
    }
  },methods: {
    submit() {
      if(this.username === 'Yates' && this.password === '123456') {
        this.$router.push('/profile')
        this.$bus.$emit('received', this.profileData)
      }
    }
  },
}
</script>

<style lang="css" scoped>
  #login {
    height: 100vh;
    padding: 100px 0 ;
    background: url('~assets/img/login/login-bg.jpg');
    background-size: 100% 100%;
    box-sizing: border-box;
  }
  .login-form {
    width: 80%;
    height: 100%;
    background-color: #fff;
    border-radius: 5%;
    margin: 0 auto;
    padding: 20px 20px;
    box-shadow: 0 2px 2px rgba(0,0,0,.2);
  }
  .login-form h1 {
    font-size: 28px;
    color: #000;
  }
  .login-form .tip-text {
    color: #fe7316;
    font-size: 16px;
    margin-top: 20px;
  }
  .login-form input {
    width: 100%;
    font-size: 14px;
    border-bottom: 1px solid #000;
    margin-top: 20px;
    font-weight: 700;
  }
  .login-form .submit {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #f44d30;
    margin: 15px 0;
    border-radius: 505px;
    color: #fff;
  }
  .login-func {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 700;
    color: #000;
  }
  .other {
    font-size: 16px;
    font-family: '微软雅黑';
    text-align: center;
    margin: 15px 0;
  }
  .other-icon {
    display: flex;
    justify-content: space-evenly;
  }
  .other-icon img{
    width: 32px;
    height: 32px;
  }

</style>