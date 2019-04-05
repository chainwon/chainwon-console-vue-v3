<template>
  <el-main class="chainwon-content">
    <div class="chainwon-item chainwon-box">
      <div class="chainwon-submit">
        <el-upload
          class="chainwon-upload"
          :action="'api/controller/picupload'"
          accept="image/*"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
          v-loading="upload"
        >
          <img v-if="website.imageUrl" :src="website.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="chainwon-info">
          <el-input v-model="website.title" placeholder="标题" style="margin-bottom:10px;"></el-input>
          <el-input v-model="website.url" placeholder="链接" style="margin-bottom:10px;"></el-input>
          <el-input type="textarea" v-model="website.des" placeholder="介绍"></el-input>
        </div>
      </div>
      <el-button type="primary" style="width:100%;">提交网址</el-button>
      <ul>
        <li>提交说明
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

        <li>反链说明
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
        <li>反链特权
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
        imageUrl: "",
        title: "",
        url: "",
        des: ""
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
        this.upload = false;
    },
    beforeAvatarUpload(file) {
      this.upload = true;
      this.website.imageUrl = URL.createObjectURL(file);
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
.chainwon-submit {
  margin-top: 20px;
  margin-bottom: 10px;
}
.chainwon-submit::after {
  content: "";
  clear: both;
  display: table;
}
.chainwon-upload {
  font-size: 0;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  float: left;
  box-sizing: border-box;
  width: 152px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 152px;
  line-height: 152px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 152px;
  display: block;
  border-radius: 4px;
}
.chainwon-info {
  float: left;
  width: calc(100% - 152px);
  padding-left: 10px;
  box-sizing: border-box;
}
ul {
  font-size: 13px;
  padding-left: 2em;
  margin-bottom: 25px;
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