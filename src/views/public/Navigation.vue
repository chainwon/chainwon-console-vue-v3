<template>
  <el-main id="chainwon-content">
    <div class="chainwon-item setting-box">
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
          >
            <img v-if="website.logo" :src="website.logo" class="avatar">
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
        </div>
        <div class="chainwon-alert">
          <ul>
            <li>
              提交说明
              <ul>
                <li>
                  <p>请输入图片的链接地址！</p>
                </li>
                <li>
                  <p>图片必须是正方形！</p>
                </li>
                <li>
                  <p>图片分辨率大小至少为100×100px！</p>
                </li>
                <li>
                  <p>
                    进QQ群
                    <a>482634342</a> 与站长交流。
                  </p>
                </li>
              </ul>
            </li>

            <li>
              反链说明
              <ul>
                <li>
                  <p style="color: blue;">在通过你的网站访问本站时，会有助于你的网站在本站的排行！</p>
                </li>
                <li>
                  <p>标题：轻惋导航</p>
                </li>
                <li>
                  <p>介绍：这个导航将会有无限的可能！</p>
                </li>
                <li>
                  <p>
                    链接：
                    <a href="https://www.chainwon.com/" target="_blank">https://www.chainwon.com/</a>
                  </p>
                </li>
                <li>
                  <p>
                    Logo：
                    <a
                      href="https://www.chainwon.com/static/logo.png"
                      target="_blank"
                    >https://www.chainwon.com/static/logo.png</a>
                  </p>
                </li>
              </ul>
            </li>
            <li>
              反链特权
              <ul>
                <li>
                  <p>在通过你的网站访问本站时，会有助于你的网站在本站的排行！</p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <el-button :loading="loading" type="primary" @click="onSubmit()">提交网址</el-button>
    <br>
    <br>
  </el-main>
</template>

<script>
export default {
  name: "PucblicNavigation",
  data() {
    return {
      loading: false,
      upload: false,
      website: {
        logo: "",
        name: "",
        site: "",
        intro: ""
      }
    };
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
        this.loading = true
        this.axios
          .post("/api/controller/newNavigation", {
            logo: this.website.logo,
            name: this.website.name,
            site: this.website.site,
            intro: this.website.intro
          })
          .then(res => {
            if (res.data.state == 1) {
              this.$alert(res.data.notice)
            } else {
              this.$alert(res.data.notice)
            }
            this.loading = false
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
.chainwon-alert {
  border: 2px dashed #eee;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  margin-top: 10px;
  color: #606266;
  border-radius: 4px;
}
.chainwon-alert ul {
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
ul {
  font-size: 13px;
  padding-left: 2em;
  margin-bottom: 2em;
  color: #f4696a;
}

ul li p {
  color: rgb(90, 95, 105);
  margin: 3px 0;
}

ul li p a {
  color: #f4696a;
}
@media screen and (max-width: 768px) {
  .chainwon-info {
    width: 100%;
    padding-left: 0;
    padding-top: 10px;
  }
}
</style>