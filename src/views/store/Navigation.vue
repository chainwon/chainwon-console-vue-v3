<template>
  <el-main id="chainwon-content">
    <el-row
      :gutter="gutter"
      v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
    >
        <ProjectBox v-for="item in project" :key="item.time" :item="item"></ProjectBox>
    </el-row>
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
      gutter: 20,
      screenWidth: document.body.clientWidth,
      page: 1,
      busy: false,
      loading: false,
      project: []
    };
  },
  created() {
    this.autoScreen();
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
    },
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

<style scoped>
</style>
