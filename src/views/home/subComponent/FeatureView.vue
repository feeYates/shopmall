<template>
  <div class="feature-container">
    <a href="https://act.mogujie.com/zzlx67">
      <img src="../../../assets/img/home/recommend_bg.jpg" alt="" @load="imgLoad">
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    imgLoad() {
      this.$bus.$emit('itemImgLoad')
    }
  },
}
</script>

<style scoped>
.feature-container img{
  width: 100%;
}
</style>