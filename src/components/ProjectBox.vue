<template>
  <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
    <div class="chainwon-item chainwon-project-box">
      <div
        class="chainwon-background"
        style="background-image:url(https://i.loli.net/2018/02/13/5a8302bdbadaa.jpg);"
      ></div>
      <div class="chainwon-logo">
        <a class="mdui-ripple" href="https://dribbble.com/" target="_blank">
          <img src="https://cdn.chainwon.com/img/logo/ff47f9651415348db340447b0cf4898e.png">
        </a>
      </div>
      <div class="chainwon-title">Dribbble</div>
      <div class="chainwon-des">Dribbble 是设计师获得灵感，反馈，社区和工作的地方，也是您发现全球设计师并与之联系的最佳方式。</div>
      <el-button type="primary" size="mini">添加</el-button>
    </div>
  </el-col>
</template>

<script>
export default {
  name: "ProjectBox"
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