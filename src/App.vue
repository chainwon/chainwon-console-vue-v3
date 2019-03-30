<template>
  <el-container id="app">
    <Menu :isCollapse="isCollapse"/>
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
      isCollapse: false
    };
  },
  methods: {
    retract() {
      if (this.isCollapse) {
        this.isCollapse = false;
      } else {
        this.isCollapse = true;
      }
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
}
.el-button.is-circle {
  border: none;
  margin-right: 10px;
}
@media screen and (max-width: 768px) {
  #chainwon-content {
    padding: 10px;
  }
  .chainwon-item {
    margin-bottom: 10px;
  }
}
</style>
