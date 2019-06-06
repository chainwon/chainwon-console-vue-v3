<template>
  <el-main class="chainwon-content">
    <div class="chainwon-item chainwon-box">
      <p>
        <a
          href="https://shang.qq.com/wpa/qunwpa?idkey=d75bc474c00a39431e2dd839812bb5bc2fe401a3f47cdf256bd8803a1c22cdcb"
        >进群交流</a>
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