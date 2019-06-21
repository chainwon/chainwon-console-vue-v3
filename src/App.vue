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

  next();
});
</script>

<style>
@import url(//at.alicdn.com/t/font_1067766_yko9gbocu4k.css);

body {
  margin: 0;
  background-color: #f3f3f3;
}
.chainwon-item {
  margin-bottom: 20px;
  border-radius: 4px;
  background-color: #fff;
}
.chainwon-item:last-child {
  margin-bottom: 0;
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

.el-select > .el-input {
  margin-bottom: 0;
}

.el-form {
  width: 100%;
}

.el-form-item {
  margin-bottom: 0 !important;
  display: flex;
}

#chainwon-content {
  animation: loading 0.2s;
}

@keyframes loading {
  from {
    transform: translateY(50px);
  }
  to {
    transform: translateY(0);
  }
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
