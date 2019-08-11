<template>
  <el-main id="chainwon-content">
    <div class="chainwon-item setting-box">
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
          >
            <img v-if="website.logo" :src="website.logo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="chainwon-info">
            <el-input v-model="website.name" placeholder="标题" style="margin-bottom:10px;"></el-input>
            <el-input v-model="website.site" placeholder="链接"></el-input>
          </div>
          <el-input
            type="textarea"
            v-model="website.intro"
            placeholder="介绍"
            style="margin-top:10px;"
          ></el-input>
          <el-alert
            style="margin-top:10px;"
            v-if="website.public == 0"
            title="此项目不允许公共编辑，仅绑定该站点的站长可以修改站点信息！"
            type="warning"
            show-icon
          ></el-alert>
          <el-alert
            style="margin-top:10px;"
            v-if="website.public == 1"
            title="此项目默认允许公共编辑，如果您是该站点站长，请登录绑定该站，然后可以禁止公共编辑！"
            type="success"
            show-icon
          ></el-alert>
        </div>
      </div>
    </div>
    <el-button
      v-if="website.public == 1 || website.banButton != null"
      :loading="loading"
      type="primary"
      @click="onSubmit()"
    >提交更改</el-button>
    <el-button
      v-if="website.public == 1 && website.banButton == null"
      type="warning"
      @click="r()"
      plain
    >认领站点</el-button>
    <el-button
      :loading="loading_ban"
      type="info"
      v-if="website.banButton == 1"
      @click="ban()"
      plain
    >禁止公共编辑</el-button>
    <el-button
      :loading="loading_ban"
      type="success"
      v-if="website.banButton == 0"
      @click="ban()"
      plain
    >允许公共编辑</el-button>
    <div class="chainwon-item setting-box chainwon-change">
      <div class="chainwon-setting-box-content">
        <li
          v-for="(item, index) in website.change"
          :key="item.time"
        >{{ index }} - {{ item.uid }} - {{ item.time }}</li>
      </div>
    </div>
    <div class="chainwon-item setting-box chainwon-comment">
      <div class="chainwon-setting-box-content">
        <div id="disqus_thread"></div>
      </div>
    </div>
  </el-main>
</template>

<script>
import "disqusjs/dist/disqusjs.css";
import DisqusJS from "disqusjs";

export default {
  name: "PucblicNavigation",
  data() {
    return {
      loading: false,
      loading_ban: false,
      upload: false,
      website: {
        logo: "",
        name: "",
        site: "",
        intro: ""
      }
    };
  },
  mounted() {
    var dsqjs = new DisqusJS({
      shortname: "chainwon",
      siteName: "轻惋起始页",
      identifier: window.location.href,
      url: window.location.href,
      title: this.website.name + " 站点编辑 - 轻惋起始页",
      api: "https://disqus.skk.moe/disqus/",
      apikey:
        "61rFykkPI1vwruqiOS0NYWd388RVqIEdBhLuCkZwDjJvjr6mKep0TILZoQxFZHRX",
      admin: "nexmoe",
      adminLabel: "站长"
    });
  },
  created() {
    this.axios
      .post("/api/view/edit", {
        site_id: this.$route.params.id
      })
      .then(res => {
        this.website = res.data;
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
    onSubmit() {
      if (this.upload == false) {
        this.loading = true;
        this.axios
          .post("/api/controller/editUpdate", {
            logo: this.website.logo,
            name: this.website.name,
            site: this.website.site,
            intro: this.website.intro,
            site_id: this.$route.params.id
          })
          .then(res => {
            if (res.data.state == 1) {
              this.$alert(res.data.notice);
            } else {
              this.$alert(res.data.notice);
            }
            this.loading = false;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.$notify({
          title: "警告",
          message: "请等待图片上传完成！",
          type: "warning"
        });
      }
    },
    ban() {
      this.loading_ban = true;
      this.axios
        .post("/api/controller/editBan", {
          site_id: this.$route.params.id
        })
        .then(res => {
          this.$notify({
            title: "成功！",
            message: res.data.notice,
            type: "success"
          });
          this.website.banButton = res.data.public;
          this.website.public = res.data.public;
          this.loading_ban = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    r() {
      this.$router.push("/setting/site");
    }
  }
};
</script>

<style>
.el-upload {
  display: block !important;
}
</style>

<style scoped>
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
.chainwon-change {
  margin-top: 20px;
}
</style>