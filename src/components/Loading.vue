<template>
  <div class="chainwon-loading">
    <div class="icon" v-loading="true"></div>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style>
.el-loading-spinner .path {
  stroke-width: 3px !important;
}
</style>

<style scoped>
.chainwon-loading {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: auto;
  border-radius: 100px;
  overflow: hidden;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
  background-color: #fff;
}
.chainwon-loading .icon {
  height: 56px;
  width: 56px;
}
</style>