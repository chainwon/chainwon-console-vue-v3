<template>
  <el-row :gutter="gutter">
    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" v-for="item in project" :key="item.time">
      <div class="chainwon-item chainwon-project-box">
        <div class="chainwon-background" :style="'background-image:url('+ item.cover +');'"></div>
        <div class="chainwon-logo">
          <a class="mdui-ripple" :href="item.site" target="_blank">
            <img :src="item.logo">
          </a>
        </div>
        <div class="chainwon-title">{{item.name}}</div>
        <div class="chainwon-des">{{item.intro}}</div>
        <el-button type="primary" size="mini" plain>添加</el-button>
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