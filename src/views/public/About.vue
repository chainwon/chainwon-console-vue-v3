<template>
  <el-main class="chainwon-content">
    <div class="chainwon-item chainwon-box">
      <p>
        <el-image src="https://i.dawnlab.me/1e5b46f95c578444e69821dfb5d5ae77.md.jpg"></el-image>
      </p>
      <p>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp"
          >{{activity.content}}</el-timeline-item>
        </el-timeline>
      </p>
    </div>
  </el-main>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      activities: [
        {
          content: "整理了下2年前的代码，更加稳定了，整个系统全部都交给朋友维护了，应该会比我稳。控制台也开源了，Github：https://github.com/chainwon/chainwon-console-vue-v3",
          timestamp: "2021-07-16"
        },
        {
          content: "加入站点搜索，分类标签",
          timestamp: "2019-06-30"
        },
        {
          content:
            "现在可以绑定自己的站点了，绑定后就可以随时修改站点信息了（虽然这个功能我还没写完）",
          timestamp: "2019-06-21"
        },
        {
          content: "个性风格功能发布",
          timestamp: "2019-06-19"
        },
        {
          content: "网址提交重新上线",
          timestamp: "2019-06-06"
        },
        {
          content: "轻惋导航 Beta 版本回归",
          timestamp: "2019-05-11"
        },
        {
          content: "适配2K分辨率屏幕",
          timestamp: "2019-04-05"
        },
        {
          content: "控制台基于 Vue 重写",
          timestamp: "2019-03-03"
        },
        {
          content: "轻惋导航创建",
          timestamp: "2016-04-29"
        }
      ],
      date: "",
      kao: ""
    };
  },
  created() {
    var date1 = new Date();
    var date2 = new Date("2020-07-20");
    var date3 = new Date("2020-06-07");
    this.date = (date2.getTime() - date1.getTime()) / (24 * 60 * 60 * 1000);
    this.kao = (date3.getTime() - date1.getTime()) / (24 * 60 * 60 * 1000);
  }
};
</script>

<style scoped>
.el-timeline {
  padding-left: 0;
}
.el-timeline-item:last-child {
  padding-bottom: 0;
}
</style>