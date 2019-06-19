<template>
  <el-main id="chainwon-content">
    <div class="chainwon-item setting-box">
      <div class="chainwon-setting-box-header">选择风格</div>
      <div class="chainwon-setting-box-content">
        <el-row :gutter="20">
          <el-col
            :xs="24"
            :sm="24"
            :md="12"
            :lg="8"
            :xl="6"
            v-for="(item, index) in themes"
            :key="item.tid"
          >
            <div class="mixcm-theme">
              <el-image :src="item.cover" width="100%" height="200px" fit="cover">
                <div
                  slot="error"
                  style="display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 200px;
                    background: #f5f7fa;
                    color: #909399;"
                >
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <el-button
                v-if="!item.check"
                type="primary"
                @click="changTheme(item.tid,index)"
                round
              >使用</el-button>
              <el-button v-if="item.check" type="info" round>正在使用</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="chainwon-item setting-box">
      <div class="chainwon-setting-box-header">自定义CSS</div>
      <div class="chainwon-setting-box-content">
        <el-form>
          <el-input type="textarea" autosize v-model="user.css"></el-input>
        </el-form>
      </div>
    </div>
    <el-button :loading="loading" type="primary" @click="saveCss()">保存</el-button>
  </el-main>
</template>

<script>
export default {
  name: "SettingStyle",
  data() {
    return {
      user: {},
      themes: [],
      loading: false
    };
  },
  created() {
    this.axios
      .post("/api/view/settingStyle")
      .then(res => {
        this.user = res.data.user;
        this.themes = res.data.themes;
        this.searchQuery();
        console.log(this.themes);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    searchQuery() {
      for (var i = 0; i < this.themes.length; i++) {
        if (this.themes[i].tid == this.user.theme) {
          this.themes[i].check = true;
        }
      }
    },
    changTheme(tid, index) {
      this.axios
        .post("/api/controller/changeTheme", {
          tid: tid
        })
        .then(res => {
          if (res.data.state == 1) {
            for (var i = 0; i < this.themes.length; i++) {
              this.themes[i].check = false;
            }
            this.themes[index].check = true;
            this.themes.push([]);
            this.themes.pop();
            this.$notify({
              title: "成功",
              message: res.data.info,
              position: "bottom-right",
              type: "success"
            });
          } else {
            this.$notify({
              title: "失败",
              message: res.data.info,
              position: "bottom-right",
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    saveCss() {
      this.loading=true
      this.axios
        .post("/api/controller/saveCss", {
          css: this.user.css
        })
        .then(res => {
          this.loading=false
          if (res.data.state == 1) {
            this.$notify({
              title: "成功",
              message: res.data.info,
              position: "bottom-right",
              type: "success"
            });
          } else {
            this.$notify({
              title: "失败",
              message: res.data.info,
              position: "bottom-right",
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.el-image {
  border-radius: 4px;
  overflow: hidden;
  font-size: 0;
}
.mixcm-theme {
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 20px;
}
.mixcm-theme .el-button {
  position: absolute;
  right: 20px;
  bottom: 0px;
}
</style>