<template>
  <el-main id="chainwon-content">
    <el-row :gutter="gutter">
      <ProjectBox v-for="item in project" :key="item.time" :item="item"></ProjectBox>
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
      screenWidth: document.body.clientWidth,
      project: []
    };
  },
  created() {
    this.autoScreen();
    this.axios
      .get(this.GLOBAL.API + "/view/storeNavigation")
      .then(res => {
        this.project = res.data;
        console.log(res.data);
      })
      .catch(function(error) {
        console.log(error);
      });
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
