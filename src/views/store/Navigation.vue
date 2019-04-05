<template>
  <el-main id="chainwon-content">
    <ProjectBox
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
      :project="project"
    ></ProjectBox>
    <Loading v-if="loading"/>
  </el-main>
</template>

<script>
import ProjectBox from "@/components/ProjectBox";
import Loading from "@/components/Loading";

export default {
  name: "Navigation",
  components: {
    ProjectBox,
    Loading
  },
  data() {
    return {
      page: 1,
      busy: false,
      loading: false,
      project: []
    };
  },
  created() {
    this.axios
      .post("/api/view/storeNavigation", {
        page: this.page
      })
      .then(res => {
        this.project = res.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    loadMore: function() {
      this.busy = true;
      this.loading = true;
      this.page++;
      this.axios
        .post("/api/view/storeNavigation", {
          page: this.page
        })
        .then(res => {
          if (res.data.length > 0) {
            this.project = this.project.concat(res.data);
            this.busy = false;
          }
          this.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
