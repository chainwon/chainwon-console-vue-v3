<template>
  <el-main id="chainwon-content">
    <div class="chainwon-item setting-box">
      <div class="chainwon-setting-box-header">
        <el-form>
          <el-form-item label="搜索引擎" prop="region">
            <el-select v-model="form.search" placeholder="选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="chainwon-item setting-box">
      <div class="chainwon-setting-box-header">你的个人网址链接</div>
      <div class="chainwon-setting-box-content">
        <el-form>
          <el-input v-model="form.url"></el-input>
        </el-form>
      </div>
    </div>
    <div class="chainwon-item setting-box">
      <div class="chainwon-setting-box-header">网址大全显示设置</div>
      <div class="chainwon-setting-box-content">
        <p>你可以使用奇♂怪的操作，比如 Function Twelve (12)</p>
        <el-form>
          <el-form-item label="以最新收录排序">
            <el-switch :active-value="'1'" :inactive-value="'0'" v-model="form.newest"></el-switch>
          </el-form-item>
          <el-form-item label="展示未审核内容">
            <el-switch :active-value="'1'" :inactive-value="'0'" v-model="form.unaudited" disabled></el-switch>
          </el-form-item>
          <el-form-item label="展示封禁（18×）内容">
            <el-switch :active-value="'1'" :inactive-value="'0'" v-model="form.ban" disabled></el-switch>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="chainwon-item setting-box">
      <div class="chainwon-setting-box-header">额外功能</div>
      <div class="chainwon-setting-box-content">
        <el-form>
          <el-form-item label="收看广告（唯一收入来源）">
            <el-switch :active-value="'1'" :inactive-value="'0'" v-model="form.appearad"></el-switch>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="chainwon-item setting-box">
      <div class="chainwon-setting-box-header">倒计时</div>
      <div class="chainwon-setting-box-content">
        <el-form>
          <el-input v-model="form.countdown_name" placeholder="事件名称"></el-input>

          <el-date-picker style="width:100%;"
            v-model="form.countdown.time"
            type="date"
            placeholder="选择日期"
            :editable="false">
          </el-date-picker>
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
    <div class="chainwon-save">
      <el-button v-if="savebtn" type="primary" @click="save()" icon="icon el-icon-check" circle></el-button>
    </div>
  </el-main>
</template>

<script>
  export default {
    name: "SettingIndex",
    data() {
      return {
        change: 0,
        savebtn: false,
        options: [{
            value: "谷歌",
            label: "谷歌"
          },
          {
            value: "百度",
            label: "百度"
          },
          {
            value: "360",
            label: "360"
          },
          {
            value: "国搜",
            label: "国搜"
          },
          {
            value: "必应",
            label: "必应"
          }
        ],
        form: {
          search: "百度",
          url: "url",
          newest: 1,
          unaudited: 0,
          ban: 1,
          appearad: 1,
          css: "",
          countdown_name: "",
          countdown: {
            year: "",
            month: "",
            day: ""
          }
        }
      };
    },
    created() {
      this.axios
        .post("/api/view/settingIndex")
        .then(res => {
          this.form = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    beforeRouteLeave(to, from, next) {
      if(this.change > 2){
        const answer = window.confirm('你有设置没有保存，是否保存？')
        if (answer) {
          this.save()
          next()
        } else {
          next(false)
        }
      }else{
        next()
      }
    },
    methods: {
      save() {
        this.axios
          .post("/api/controller/saveSetting", {
            form: this.form
          })
          .then(res => {
            if(res.data.state==1){
              this.$notify({
                title: '成功',
                message: res.data.info,
                position: 'bottom-right',
                type: 'success'
              });
              this.change = 2
              this.savebtn = false
            }else{
              this.$notify({
                title: '失败',
                message: res.data.info,
                position: 'bottom-right',
                type: 'error'
              });
            }
          })
        .catch(function(error) {
          console.log(error);
        });
      }
    },
    watch: {
      form: {
        handler() {
          this.change ++;
          if(this.change > 2){
            this.savebtn = true
          }
        },
        deep: true
      }
    }
  };
</script>

<style>
  .el-form-item__label {
    align-items: center;
    flex: auto;
    color: #000 !important;
    text-align: left !important;
  }

  #chainwon-content .chainwon-save .el-button .icon {
    font-size: 2em;
  }

</style>

<style scoped>
  .el-select {
    width: 85px;
    background-color: #f1f3f4;
  }

  .el-input {
    margin-bottom: 10px;
  }

  .el-input:last-child {
    margin-bottom: 0;
  }

  .el-select>.el-input {
    margin-bottom: 0;
  }

  .el-form {
    width: 100%;
  }

  .el-form-item {
    margin-bottom: 0 !important;
    display: flex;
  }

  #chainwon-content .chainwon-save {
    position: fixed;
    right: 20px;
    bottom: 20px;
  }
  #chainwon-content .chainwon-save .el-button {
    height: 56px;
    width: 56px;
    text-align: center;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
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

  #chainwon-content .setting-box p {
    font-size: 0.9em;
    color: #ff6675;
    margin-top: 0;
  }
</style>