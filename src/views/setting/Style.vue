<template>
  <el-main id="chainwon-content">
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
  export default {
    name: "SettingIndex",
    data() {
      return {
        
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
  
</style>