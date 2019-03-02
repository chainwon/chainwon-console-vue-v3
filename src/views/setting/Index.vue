<template>
  <el-main id="chainwon-content">
    <div class="chainwon-item setting-box">
      <div class="chainwon-setting-box-header">
        <el-form>
          <el-form-item label="搜索引擎" prop="region">
            <el-select placeholder="选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="chainwon-item setting-box">
      <div class="chainwon-setting-box-header">你的个人网址链接</div>
      <div class="chainwon-setting-box-content">
        <el-form>
          <el-input></el-input>
        </el-form>
      </div>
    </div>
    <div class="chainwon-item setting-box">
      <div class="chainwon-setting-box-header">网址大全显示设置</div>
      <div class="chainwon-setting-box-content">
        <p>你可以使用奇♂怪的操作，比如 Function Twelve (12)</p>
        <el-form>
          <el-form-item label="以最新收录排序">
            <el-switch></el-switch>
          </el-form-item>
          <el-form-item label="展示未审核内容">
            <el-switch disabled></el-switch>
          </el-form-item>
          <el-form-item label="展示封禁（18×）内容">
            <el-switch disabled></el-switch>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="chainwon-item setting-box">
      <div class="chainwon-setting-box-header">额外功能</div>
      <div class="chainwon-setting-box-content">
        <el-form>
          <el-form-item label="收看广告（唯一收入来源）">
            <el-switch></el-switch>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="chainwon-item setting-box">
      <div class="chainwon-setting-box-header">倒计时</div>
      <div class="chainwon-setting-box-content">
        <el-form>
          <el-input></el-input>
          <el-input></el-input>
          <el-input></el-input>
          <el-input></el-input>
        </el-form>
      </div>
    </div>
    <div class="chainwon-item setting-box">
      <div class="chainwon-setting-box-header">自定义CSS</div>
      <div class="chainwon-setting-box-content">
        <el-form>
          <el-input type="textarea" autosize v-model="form.css"></el-input>
        </el-form>
      </div>
    </div>
  </el-main>
</template>

<script>
// @ is an alias to /src

export default {
  name: "SettingIndex",
  data() {
    return {
      form: {
        css: ""
      }
    };
  },
  components: {}
};
</script>

<style>
.el-input {
  margin-bottom: 10px;
}
.el-input:last-child {
  margin-bottom: 0;
}
.el-select > .el-input {
  margin-bottom: 0;
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
#chainwon-content .setting-box .el-form {
  width: 100%;
}
#chainwon-content .setting-box .el-form-item {
  margin-bottom: 0 !important;
  display: flex;
}
#chainwon-content .setting-box .el-form-item__label {
  align-items: center;
  flex: auto;
  color: #000 !important;
  text-align: left !important;
}
#chainwon-content .setting-box p {
  font-size: 0.9em;
  color: #f4696a;
  margin-top: 0;
}
</style>

