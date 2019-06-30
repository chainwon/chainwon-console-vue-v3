<template>
  <el-row :gutter="gutter">
    <el-col
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
      :xl="4"
      v-for="(item, index) in project"
      :key="item.time"
    >
      <div class="chainwon-item chainwon-project-box">
        <div class="chainwon-background" :style="'background-image:url('+ item.cover +');'"></div>
        <div class="chainwon-logo">
          <a class="mdui-ripple" :href="item.site" target="_blank">
            <img :src="item.logo" :alt="item.name">
          </a>
        </div>
        <div class="chainwon-major">
          <div class="chainwon-title">{{item.name}}</div>
          <el-popover
            placement="bottom"
            :title="item.name"
            v-if="!item.added"
            width="200"
            trigger="hover"
            :content="item.intro">
            <el-button
              slot="reference"
              type="primary"
              @click="addNavigation(item.site_id,index)"
              size="mini"
              icon="el-icon-circle-plus"
              plain
              round
            >添加</el-button>
          </el-popover>
          
          <el-button
            v-if="item.added"
            type="info"
            @click="removeNavigation(item.site_id,index)"
            size="mini"
            icon="el-icon-error"
            plain
            round
          >移除</el-button>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "ProjectBox",
  props: ["project"],
  data() {
    return {
      gutter: 20,
      screenWidth: document.body.clientWidth
    };
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
    },
    addNavigation(site_id, index) {
      this.axios
        .post("/api/controller/addNavigation", {
          site_id: site_id
        })
        .then(res => {
          if (res.data.state == 1) {
            this.project[index].added = true;
            this.project.push([]);
            this.project.pop();
            this.$notify({
              title: "成功",
              message: res.data.info,
              position: "bottom-right",
              type: "success"
            });
          } else {
            this.$notify({
              title: "失败",
              message: res.data.info,
              position: "bottom-right",
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    removeNavigation(site_id, index) {
      this.axios
        .post("/api/controller/removeNavigation", {
          site_id: site_id
        })
        .then(res => {
          if (res.data.state == 1) {
            this.project[index].added = false;
            this.project.push([]);
            this.project.pop();
            // this.project.splice(index, 1);
            this.$notify({
              title: "成功",
              message: res.data.info,
              position: "bottom-right",
              type: "success"
            });
          } else {
            this.$notify({
              title: "失败",
              message: res.data.info,
              position: "bottom-right",
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.chainwon-project-box .chainwon-logo img {
  border-radius: 100%;
  height: 100px;
  width: 100px;
  border: 4px solid #fff;
  background: #fff;
}
</style>

<style scoped>
.el-button {
  
}
.chainwon-project-box {
  overflow: hidden;
  margin-bottom: 20px;
}
.chainwon-project-box .chainwon-background {
  width: 100%;
  height: 84px;
  background-size: cover;
  background-position: center;
}
.chainwon-project-box .chainwon-logo {
  margin-top: -54px;
  float: left;
  margin-left: 30px;
  margin-bottom: 15px;
}
.chainwon-project-box .chainwon-major {
  float: left;
  width: calc(100% - 138px);
  padding-left: 10px;
  box-sizing: border-box;
  margin-top: -34px;
}
.chainwon-project-box .chainwon-major .chainwon-title {
  height: 30px;
  line-height: 29px;
  font-weight: 900;
  margin-bottom: 12px;
  color: #fff;
  text-shadow: 0 0 0 #000;
}
.chainwon-project-box .chainwon-major .chainwon-des {
  margin: 6px 15px;
  text-align: center;
  color: #888;
  font-size: 12px;
  height: 36px;
  line-height: 18px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
@media screen and (max-width: 768px) {
  .chainwon-project-box {
    margin-bottom: 10px;
  }
  .el-button {
    margin-bottom: 15px;
    width: 70px;
  }
}
</style>