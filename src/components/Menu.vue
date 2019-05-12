<template>
  <el-aside id="chainwon-menu" v-bind:class="{ iscollapse: isCollapse }" style="background-color:#545c64;min-height: 100vh;">
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      :router="true"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <el-menu-item :index="false"></el-menu-item>
      <el-menu-item :index="false" onclick="window.open('https://www.chainwon.com/')">
        <i class="iconfont icon-home-fill"></i>
        <span slot="title">回到导航</span>
      </el-menu-item>
      <el-menu-item index="/setting/index">
        <i class="iconfont icon-setting-fill"></i>
        <span slot="title">个性设置</span>
      </el-menu-item>
      <el-menu-item index="/setting/navigation">
        <i class="iconfont icon-unorderedlist"></i>
        <span slot="title">我的网址</span>
      </el-menu-item>
      <li class="chainwon-divider"></li>
      <el-menu-item index="/store/navigation">
        <i class="iconfont icon-compass-fill"></i>
        <span slot="title">网址大全</span>
      </el-menu-item>
      <li class="chainwon-divider"></li>
      <!--<el-menu-item index="/public/navigation">
        <i class="iconfont icon-plus-circle-fill"></i>
        <span slot="title">收录网址</span>
      </el-menu-item>-->
      <el-menu-item index="/public/about">
        <i class="iconfont icon-info-circle-fill"></i>
        <span slot="title">关于本站</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      screenWidth: document.body.clientWidth // 这里是给到了一个默认值 （这个很重要）
    };
  },
  props: {
    isCollapse: Boolean
  },
  created() {
    console.log(this.isCollapse)
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
      if (this.screenWidth < 1280) {
        this.isCollapse = true;
      } else {
        this.isCollapse = false;
      }
      this.$emit("sendmsg",this.isCollapse)
    }
  }
};
</script>

<style scoped>
.el-aside {
  overflow: hidden;
  width: 240px!important;
}

.el-aside.iscollapse {
  width: 65px!important;;  
}
.el-menu-item.is-active {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.1) !important;
}

.el-menu-item.is-active::before {
  content: "";
  height: 100%;
  width: 3px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
}

.el-menu {
  border-right: none;
  height: 100%;
  position: fixed;
  width: 240px;
}
.el-menu-item {
  padding: 0px 50px !important;
}
.el-menu--collapse {
  width: 65px;
}
.el-menu--collapse .el-menu-item,
.v-leave-active .el-menu-item {
  padding: 0px 20px !important;
}
#chainwon-menu {
  background-color: #545c64;
  min-height: 100vh;
}

#chainwon-menu i {
  vertical-align: middle;
  margin-right: 20px;
  width: 24px;
  text-align: center;
  font-size: 22px;
  display: inline-block;
  padding-top: 2px;
  color: #878d99;
}

#chainwon-menu span {
  font-size: 16px;
}

#chainwon-menu a {
  text-decoration-line: none;
  display: block;
  color: #fff;
}

#chainwon-menu .chainwon-divider {
  background-color: rgba(0, 0, 0, 0.12);
  width: 100%;
  height: 1px;
  margin-top: 8px;
  margin-bottom: 8px;
}
#chainwon-menu .chainwon-retract {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
