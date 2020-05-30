<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  

}
</script>

<style scoped>
#tab-bar{
  display: flex;
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f6f6f6;
  box-shadow: 0 -3px 1px rgba(0,0,0,.05);
}
</style>