<template>
  <el-main id="chainwon-content">
    <el-row :gutter="20">
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
  }
};
</script>

<style>
.el-col {
  border-radius: 4px;
  margin-bottom: 20px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 286px;
}
</style>
