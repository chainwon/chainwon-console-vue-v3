<template>
  <el-container id="app">
    <Menu @sendmsg="getmsg" :isCollapse="isCollapse"/>
    <el-container class="is-vertical">
      <el-header id="chainwon-header">
        <el-button @click="retract()" icon="iconfont icon-menu" circle></el-button>
        {{ title }}
      </el-header>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "./components/Menu.vue";

export default {
  name: "app",
  components: {
    Menu
  },
  data() {
    return {
      title: this.$route.meta.title,
      isCollapse: false,
      user: []
    };
  },
  created() {
    this.axios
      .post("/api/view/user")
      .then(res => {
        this.user = res.data;
        if (this.user.uid == 0) {
          window.location.href = "https://account.mixcm.com";
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    retract() {
      if (this.isCollapse) {
        this.isCollapse = false;
      } else {
        this.isCollapse = true;
      }
    },
    getmsg(data) {
      this.isCollapse = data;
    }
  },
  watch: {
    $route(to, from) {
      this.title = to.meta.title;
    }
  }
};

import router from "./router";
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    var title = to.meta.title + " - 控制台 - 轻惋导航";
    document.title = title;
  }

  // 百度统计
  setTimeout(() => {
    var _hmt = _hmt || [];
    (function() {
      //每次执行前，先移除上次插入的代码
      document.getElementById("baidu_tj") &&
        document.getElementById("baidu_tj").remove();
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?41b04999ee3d67f2acc9ce741045e68d";
      hm.id = "baidu_tj";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  }, 0);

  next();
});
</script>

<style>
body {
  margin: 0;
  background-color: #f3f3f3;
}
.chainwon-item {
  margin-bottom: 20px;
  border-radius: 4px;
  background-color: #fff;
}
.chainwon-box {
  padding: 1px 20px;
}
.chainwon-box p {
  margin: 20px 0;
}
#chainwon-header {
  background-color: #fff;
  line-height: 60px;
  border-bottom: 1px solid #eee;
}
.el-button.is-circle {
  border: none;
  margin-right: 10px;
}
.el-main {
  max-height: calc(100vh - 60px);
  overflow-y: auto;
}

.el-select {
    width: 85px;
    background-color: #f1f3f4;
  }

  .el-input {
    margin-bottom: 10px;
  }

  .el-input:last-child {
    margin-bottom: 0;
  }

  .el-select>.el-input {
    margin-bottom: 0;
  }

  .el-form {
    width: 100%;
  }

  .el-form-item {
    margin-bottom: 0 !important;
    display: flex;
  }

  #chainwon-content .chainwon-save {
    position: fixed;
    right: 20px;
    bottom: 20px;
  }
  #chainwon-content .chainwon-save .el-button {
    height: 56px;
    width: 56px;
    text-align: center;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
  }

  #chainwon-content .setting-box .chainwon-setting-box-header {
    height: 64px;
    padding: 0 24px;
    align-items: center;
    display: flex;
  }

  #chainwon-content .setting-box .chainwon-setting-box-content {
    padding: 24px;
    padding-top: 0;
  }

  #chainwon-content .setting-box p {
    font-size: 0.9em;
    color: #ff6675;
    margin-top: 0;
  }
  
@media screen and (max-width: 768px) {
  #chainwon-content {
    padding: 10px;
  }
  .chainwon-item {
    margin-bottom: 10px;
  }
  .chainwon-box {
    padding: 1px 10px;
  }
}
</style>
