<template>
  <el-main id="chainwon-content">
    <ProjectBox
      :project="project"
    ></ProjectBox>
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
      project: []
    };
  },
  created() {
    this.axios
      .post("/api/view/settingNavigation", {
        page: this.page
      })
      .then(res => {
        this.project = res.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>