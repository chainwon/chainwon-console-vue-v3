<template>
  <el-main class="chainwon-content">
    <div class="chainwon-item chainwon-box">
      <p>
        <el-alert title="准备高考了，所以出现问题不一定能及时修复。" type="error">
          <el-link
            type="primary"
            href="https://shang.qq.com/wpa/qunwpa?idkey=d75bc474c00a39431e2dd839812bb5bc2fe401a3f47cdf256bd8803a1c22cdcb"
            target="_blank"
          >进群交流</el-link>：482634342 <br>
          <el-link type="primary" href="https://club.chainwon.com/" target="_blank">进论坛反馈</el-link>：https://club.chainwon.com/
        </el-alert>
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
          content:
            "加入站点搜索，分类标签",
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
      ]
    };
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