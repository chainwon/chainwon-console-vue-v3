<template>
  <el-row :gutter="gutter">
    <el-col
      :xs="12"
      :sm="6"
      :md="4"
      :lg="3"
      :xl="3"
      v-for="(item, index) in project"
      :key="item.time"
    >
      <div class="chainwon-item chainwon-project-box">
        <!--<div class="chainwon-background" :style="'background-image:url('+ item.logo +');'"></div>-->
        <div class="chainwon-logo">
          <div class="chainwon-background" :style="'background-image:url('+ item.cover +');'"></div>
          <a class="mdui-ripple" :href="item.site" target="_blank">
            <img :src="item.logo" :alt="item.name">
          </a>
        </div>
        <div class="chainwon-major">
          <el-popover
            placement="bottom"
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
              round
            >添加</el-button>
          </el-popover>
          
          <el-button
            v-if="item.added"
            type="info"
            @click="removeNavigation(item.site_id,index)"
            size="mini"
            icon="el-icon-error"
            round
          >移除</el-button>
          <div class="chainwon-title">{{item.name}}</div>
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

</style>

<style scoped>
.chainwon-project-box {
  overflow: hidden;
  margin-bottom: 20px;
  padding: 30px;
  padding-bottom: 0;
  position: relative;
}
.chainwon-project-box .chainwon-background {
  width: calc(100% + 60px);
  top: -30px;
  left: -30px;
  height: calc(50% + 40px);
  position: absolute;
  background-size: cover;
  background-position: center;
}
.chainwon-project-box .chainwon-logo {
  position: relative;
  padding-bottom: 100%;
  height: 0;
}
.chainwon-project-box .chainwon-logo img {
  width: 100%;
  background: #fff;
  border-radius: 4px;
  position: relative;
}
.chainwon-project-box .chainwon-major {
  margin-top: -24px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  position: relative;
  z-index: 5;
}
.chainwon-project-box .chainwon-major .chainwon-title {
  margin-top: 8px;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  .chainwon-project-box {
    overflow: hidden;
    margin-bottom: 20px;
    padding: 20px;
    padding-bottom: 0;
    position: relative;
  }
}
</style>