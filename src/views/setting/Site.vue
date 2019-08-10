<template>
  <el-main id="chainwon-content">
    <div class="chainwon-item setting-box" v-for="item in sites" :key="item.index">
      <div style="height:24px;"></div>
      <div class="chainwon-setting-box-content">
        <div class="chainwon-submit">
          <router-link class="mdui-ripple" :to="'/store/edit/'+item.site_id">
          <el-upload
            class="chainwon-upload"
            :action="'/api/controller/uploadImage'"
            accept="image/*"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            v-loading="item.upload"
            disabled
          >
            <img v-if="item.logo" :src="item.logo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          </router-link>
          <div class="chainwon-info">
            <el-input v-model="item.name" placeholder="标题" style="margin-bottom:10px;" disabled></el-input>
            <el-input v-model="item.site" placeholder="链接" disabled></el-input>
          </div>
          <!--<el-input
            type="textarea"
            v-model="item.intro"
            placeholder="介绍"
            style="margin-top:10px;"
            disabled
          ></el-input>-->
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
              <el-input v-model="website.name" placeholder="标题" style="margin-bottom:10px;"></el-input>
              <el-input v-model="website.site" placeholder="链接" disabled></el-input>
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
                      <a
                        href="https://www.chainwon.com/"
                        target="_blank"
                      >https://www.chainwon.com/</a>
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
          <el-button @click="active--">上一步</el-button>
          <el-button :loading="loading" @click="onSubmit()" type="primary">下一步</el-button>
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
      active: 0
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
            location.reload()
          } else {
            this.$alert(res.data.notice);
          }
          this.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onSubmit() {
      if (this.upload == false) {
        this.loading = true;
        this.axios
          .post("/api/controller/newNavigation", {
            logo: this.website.logo,
            name: this.website.name,
            site: this.website.site,
            intro: this.website.intro
          })
          .then(res => {
            if (res.data.state == 1) {
              this.$notify({
                title: "成功",
                message: res.data.notice,
                position: "bottom-right",
                type: "success"
              });
              this.active++;
              this.site_id = res.data.site_id;
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
  margin-top: 10px;
  color: #606266;
  border-radius: 4px;
}
.chainwon-alert ol,
.chainwon-alert ul {
  padding-left: calc(1em + 5px);
  margin: 0;
}
ul,
ol {
  font-size: 13px;
  color: #f4696a;
}
ol li p,
ul li p {
  color: #606266;
  margin: 3px 0;
  word-break: break-all;
}
ol li p a,
ul li p a {
  color: #f4696a;
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