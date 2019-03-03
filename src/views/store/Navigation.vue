<template>
  <el-main id="chainwon-content">
    <el-row :gutter="gutter">
      <ProjectBox></ProjectBox>
      <ProjectBox></ProjectBox>
      <ProjectBox></ProjectBox>
    </el-row>
  </el-main>
</template>

<script>
import ProjectBox from "@/components/ProjectBox";

export default {
  name: "Navigation",
  components: {
    ProjectBox
  },
  data() {
    return {
      gutter: 20,
      screenWidth: document.body.clientWidth
    }
  },
  created() {
    this.autoScreen();
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth;
        this.autoScreen();
      })();
    };
  },
  methods: {
    autoScreen() {
      if (this.screenWidth <= 768) {
        this.gutter = 10;
      } else {
        this.gutter = 20;
      }
    }
  }
};
</script>

<style scoped>

</style>
