<template>
  <el-main id="chainwon-content">
    <div class="chainwon-item setting-box" v-for="item in sites" :key="item.index">
      <div style="height:24px;"></div>
      <div class="chainwon-setting-box-content">
        <div class="chainwon-submit">
            <el-upload
              class="chainwon-upload"
              :action="'/api/controller/uploadImage'"
              accept="image/*"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              :show-file-list="false"
              v-loading="upload"
               disabled
            >
              <img v-if="item.logo" :src="item.logo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="chainwon-info">
              <el-input v-model="item.name" placeholder="标题" style="margin-bottom:10px;"  disabled></el-input>
              <el-input v-model="item.site" placeholder="链接" disabled></el-input>
            </div>
            <el-input
              type="textarea"
              v-model="item.intro"
              placeholder="介绍"
              style="margin-top:10px;"
               disabled
            ></el-input>
          </div>
      </div>
    </div>
    <div class="chainwon-item setting-box">
      <div class="chainwon-setting-box-header">添加网站</div>
      <div class="chainwon-setting-box-content">
        <el-steps :active="active" finish-status="success" simple>
          <el-step title="输入网站"></el-step>
          <el-step title="填写信息"></el-step>
          <el-step title="验证站点"></el-step>
        </el-steps>
        <div class="chainwon-step" v-if="active==0">
          <el-input v-model="website.site" placeholder="链接" style="margin-bottom:20px;"></el-input>
          <el-button :loading="loading" @click="newSite()" type="primary">下一步</el-button>
        </div>
        <div class="chainwon-step" v-if="active==1">
          <div class="chainwon-submit">
            <el-upload
              class="chainwon-upload"
              :action="'/api/controller/uploadImage'"
              accept="image/*"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              :show-file-list="false"
              v-loading="upload"
            >
              <img v-if="website.logo" :src="website.logo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="chainwon-info">
              <el-input v-model="website.title" placeholder="标题" style="margin-bottom:10px;"></el-input>
              <el-input v-model="website.site" placeholder="链接" disabled></el-input>
            </div>
            <el-input
              type="textarea"
              v-model="website.intro"
              placeholder="介绍"
              style="margin-top:10px;margin-bottom:20px;"
            ></el-input>
          </div>
          <el-button @click="active--">上一步</el-button>
          <el-button :loading="loading" @click="active++" type="primary">下一步</el-button>
        </div>
        <div class="chainwon-step" v-if="active==2">
          验证您对 {{ website.site }} 的所有权
          <div class="chainwon-alert">
            <ol>
              <li>
                请点击
                <el-link :href="'/api/view/verifyfile?id='+site_id" target="_blank">下载验证文件</el-link>获取验证文件（当前最新：chainwon_verify.html）
              </li>
              <li>将验证文件放置于您所配置域名({{ website.site }})的根目录下</li>
              <li>
                <el-link :href="website.site+'/chainwon_verify.html'" target="_blank">点击这里</el-link>确认验证文件可以正常访问
              </li>
              <li>请点击“完成验证”按钮</li>
              <li>为保持验证通过的状态,成功验证后请不要删除.html文件</li>
            </ol>
          </div>
          <el-button :loading="loading" @click="verify()" type="primary">完成验证</el-button>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
export default {
  name: "SettingSite",
  data() {
    return {
      loading: false,
      upload: false,
      site_id: Number,
      website: {
        logo: "",
        name: "",
        site: "",
        intro: ""
      },
      sites: [],
      active: 0,
    };
  },
  created() {
    this.axios
      .post("/api/view/verifiedSite")
      .then(res => {
        this.sites = res.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.upload = false;
      console.log(res);
      if (res.state == 1) {
        this.website.logo = res.url;
      } else {
        this.$alert(res.notice);
        this.website.logo = "";
      }
    },
    beforeAvatarUpload(file) {
      this.upload = true;
      this.website.logo = URL.createObjectURL(file);
    },
    newSite() {
      this.loading = true;
      this.axios
        .post("/api/controller/newSite", {
          site: this.website.site
        })
        .then(res => {
          if (res.data.state == 1) {
            this.active++;
          } else if (res.data.state == 2) {
            this.active++;
            this.active++;
            this.$notify({
              title: "成功",
              message: res.data.notice,
              position: "bottom-right",
              type: "success"
            });
            this.site_id = res.data.site_id;
          } else {
            this.$alert(res.data.notice);
          }
          this.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    verify() {
      this.loading = true;
      this.axios
        .post("/api/controller/verify", {
          site_id: this.site_id
        })
        .then(res => {
          if (res.data.state == 1) {
            this.$notify({
              title: "成功",
              message: res.data.notice,
              position: "bottom-right",
              type: "success"
            });
          } else {
            this.$alert(res.data.notice);
          }
          this.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.chainwon-step {
  margin-top: 20px;
}
.chainwon-alert {
  border: 2px dashed #eee;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  margin: 20px 0;
  color: #606266;
  border-radius: 4px;
}
.chainwon-alert ol {
  padding-left: calc(1em + 5px);
  margin: 0;
}
.chainwon-submit::after {
  content: "";
  clear: both;
  display: table;
}
.chainwon-submit .chainwon-upload {
  font-size: 0;
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  float: left;
  box-sizing: border-box;
  width: 90px;
  height: 90px;
  border-radius: 4px;
  background-color: #fff;
}
.chainwon-submit .chainwon-upload .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 90px;
  height: 90px;
  line-height: 90px;
  text-align: center;
}
.chainwon-submit .chainwon-upload .avatar {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 4px;
}
.chainwon-submit .chainwon-info {
  float: left;
  width: calc(100% - 90px);
  padding-left: 10px;
  box-sizing: border-box;
}
</style>