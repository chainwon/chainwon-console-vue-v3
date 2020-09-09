<template>
  <el-main id="chainwon-content">
    <div class="chainwon-item setting-box" v-for="item in sites" :key="item.index">
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