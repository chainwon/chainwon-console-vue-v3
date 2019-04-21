<template>
  <el-row :gutter="gutter">
    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" v-for="(item, index) in project" :key="item.time">
      <div class="chainwon-item chainwon-project-box">
        <div class="chainwon-background" :style="'background-image:url('+ item.cover +');'"></div>
        <div class="chainwon-logo">
          <a class="mdui-ripple" :href="item.site" target="_blank">
            <img :src="item.logo">
          </a>
        </div>
        <div class="chainwon-title">{{item.name}}</div>
        <div class="chainwon-des">{{item.intro}}</div>
        <el-button v-if="!item.added" type="primary" @click="addNavigation(item.site_id,index)" size="mini" plain>添加</el-button>
        <el-button v-if="item.added" type="info" @click="removeNavigation(item.site_id,index)" size="mini" plain>移除</el-button>
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
      screenWidth: document.body.clientWidth,
      project: []
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
    addNavigation(site_id,index) {
      this.axios
        .post("/api/controller/addNavigation", {
          site_id: site_id
        })
        .then(res => {
          if(res.data.state==1){
            this.project[index].added=true
            this.$notify({
              title: '成功',
              message: res.data.info,
              position: 'bottom-right',
              type: 'success'
            });
          }else{
            this.$notify({
              title: '失败',
              message: res.data.info,
              position: 'bottom-right',
              type: 'error'
            });
          }
          
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    removeNavigation(site_id,index) {
      this.axios
        .post("/api/controller/removeNavigation", {
          site_id: site_id
        })
        .then(res => {
          if(res.data.state==1){
            this.project[index].added=false
            // this.project.splice(index, 1);
            this.$notify({
              title: '成功',
              message: res.data.info,
              position: 'bottom-right',
              type: 'success'
            });
          }else{
            this.$notify({
              title: '失败',
              message: res.data.info,
              position: 'bottom-right',
              type: 'error'
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

<style scoped>
.el-button {
  margin-bottom: 15px;
  width: 90px;
}
.chainwon-project-box {
  text-align: center;
  overflow: hidden;
}
.chainwon-project-box .chainwon-background {
  width: 100%;
  height: 95px;
  background-size: cover;
  background-position: center;
}
.chainwon-project-box .chainwon-logo {
  text-align: center;
  margin-top: -50px;
}
.chainwon-project-box .chainwon-logo img {
  border-radius: 100%;
  height: 100px;
  width: 100px;
  border: 4px solid #fff;
  background: #fff;
}
.chainwon-project-box .chainwon-title {
  height: 29px;
  line-height: 29px;
  text-align: center;
  font-weight: 900;
  margin-bottom: -5px;
}
.chainwon-project-box .chainwon-des {
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
  .chainwon-project-box .chainwon-background {
    height: 75px;
  }
  .chainwon-project-box .chainwon-logo img {
    width: 80px;
    height: 80px;
  }
  .el-button {
    margin-bottom: 15px;
    width: 70px;
  }
}
</style>