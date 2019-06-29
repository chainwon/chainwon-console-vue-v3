<template>
  <el-main id="chainwon-content">
    <div class="chainwon-tag">
      <el-button :disabled="loading" v-for="(item, index) in tag" @click="tagOn(index)" :key="index" type="primary" :plain="!item.plain" size="mini"># {{item.title}}</el-button>
    </div>
    <ProjectBox
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
      :project="project"
    ></ProjectBox>
    <Loading v-if="loading" />
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
      project: [],
      tag: [],
      tag_id: 0
    };
  },
  created() {
    this.axios
      .post("/api/view/storeNavigation", {
        page: this.page,
        tag_id: this.tag_id
      })
      .then(res => {
        this.project = res.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    this.axios
      .post("/api/view/storeTag")
      .then(res => {
        this.tag = res.data;
        this.tag[0].plain = true
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    loadMore() {
      this.busy = true;
      this.loading = true;
      this.page++;
      this.axios
        .post("/api/view/storeNavigation", {
          page: this.page,
          tag_id: this.tag_id
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
    },
    tagOn(index) {
      for(var x=0;x<this.tag.length;x++){
        this.tag[x].plain = false
      }
      this.tag_id = this.tag[index].tag_id
      this.tag[index].plain = true
      this.tag.push([]);
      this.tag.pop();
      this.page=1
      this.busy = true;
      this.loading = true;
      this.axios
        .post("/api/view/storeNavigation", {
          page: this.page,
          tag_id: this.tag_id
        })
        .then(res => {
          this.project = res.data;
          this.busy = false;
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
.chainwon-tag {
  margin-bottom: 15px;
}

.el-button {
  margin-bottom: 5px;
  margin-right: 10px;
}
.el-button + .el-button {
  margin-left: 0;
}
</style>