<template>
  <el-header id="chainwon-header">
    
    {{ title }}
  </el-header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      title: this.$route.meta.title
    };
  },
  watch: {
    $route(to, from) {
      this.title = to.meta.title;
    }
  }
};
</script>

<style scoped>
#chainwon-header {
  background-color: #fff;
  line-height: 60px;
}
.el-button.is-circle {
  border: none;
  margin-right: 10px;
}
</style>
