<template>
  <el-main id="chainwon-content">
    <div class="chainwon-item setting-box">
      <div class="chainwon-setting-box-header">自定义CSS</div>
      <div class="chainwon-setting-box-content">
        <el-form>
          <el-input type="textarea" autosize v-model="css"></el-input>
        </el-form>
      </div>
    </div>
    <el-button type="primary" @click="save()">保存</el-button>
  </el-main>
</template>

<script>
export default {
  name: "SettingStyle",
  data() {
    return {
      css: ""
    };
  },
  created() {}
};
</script>

<style scoped>
</style>