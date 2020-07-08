<template>
  <div id="user-info">
    <a href="#">
      <!-- 头像 -->
      <slot name="user-info"></slot>

      <!-- 用户登录信息 -->
      <div class="login-info">
        <slot name="user-nikename"></slot>

        <div class="phone">
          <span>
            <img class="icon-mobile" src="http://md.justfunit.com/1594139249.png-mycdn" alt />
          </span>
          <slot name="user-phone"></slot>
          <slot name="place-back"></slot>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="css" scoped>
#user-info {
  background-color: var(--color-tint);
  margin-top: -5px;
  padding-top: 20px;
  padding-left: 15px;
  width: 100%;
  height: 100px;
}

#user-info .privateImage {
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 30px;
}

.left {
  float: left;
}

#user-info .arrow-r {
  font-size: 18px;
  margin-top: -30px;
  margin-right: 5px;
}

#user-info .login-info {
  color: #fff;
  margin-top: 10px;
  margin-left: 10px;
}

.login-info .login-text {
  margin-left: 60px;
}

#user-info .login-info .phone {
  position: relative;

  font-size: 14px;
  margin-top: 5px;
  margin-left: 55px;
  font-weight: 300;
}
.phone .phone-state {
  margin-left: 20px;
}

.phone .icon-mobile {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>