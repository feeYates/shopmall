<template>
  <div class="toast" v-show="isShowToast">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  props: {
    /* message: {
      type: String,
      default: ''
    },
    isShowToast: {
      type: Boolean,
      default: false
    } */
  },
  data() {
    return {
      message: '',
      isShowToast: false
    }
  },
  methods: {
    showToast(message, duration) {
      console.log('----')
      this.isShowToast = true;
      this.message = message;

      setTimeout(() => {
        this.isShowToast = false;
        this.message = ''
      }, duration)
    }
  },
}
</script>

<style lang="css" scoped>
  .toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;

  z-index: 999;
  
  color: #fff;
  background-color: rgba(0, 0, 0, .7);
  }
</style>