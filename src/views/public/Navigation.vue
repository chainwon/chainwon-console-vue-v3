<template>
  <el-main id="chainwon-content">
    <div class="chainwon-item">
      <div class="chainwon-cover"></div>
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
          <el-input v-model="website.site" placeholder="链接" style="margin-bottom:10px;"></el-input>
          <el-input type="textarea" v-model="website.intro" placeholder="介绍"></el-input>
        </div>
      </div>
    </div>
    <el-button type="primary" style="width:100%;" @click="onSubmit()">提交网址</el-button>
    <br>
    <br>

    <div class="chainwon-item chainwon-box">
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
  </el-main>
</template>

<script>
export default {
  name: "PucblicNavigation",
  data() {
    return {
      upload: false,
      website: {
        logo: "",
        title: "",
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
        this.axios
          .post("/api/controller/newNavigation", {
            logo: this.website.logo,
            title: this.website.title,
            site: this.website.site,
            intro: this.website.intro
          })
          .then(res => {
            if (res.data.state == 1) {
              this.$alert(res.data.notice);
            } else {
              this.$alert(res.data.notice);
            }
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
.chainwon-item {
  overflow: hidden;
}
.chainwon-cover {
  height: 100px;
  width: 100%;
}
.chainwon-submit {
  margin-top: -80px;
  margin-bottom: 10px;
  padding: 35px;
  padding-bottom: 20px;
}
.chainwon-submit::after {
  content: "";
  clear: both;
  display: table;
}
.chainwon-upload {
  font-size: 0;
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  float: left;
  box-sizing: border-box;
  width: 110px;
  height: 110px;
  margin-top: -10px;
  border-radius: 100%;
  background-color: #fff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 110px;
  line-height: 110px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 110px;
  display: block;
  border-radius: 4px;
}
.chainwon-info {
  float: left;
  width: calc(100% - 110px);
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