<template>
  <div class="container-setting">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-bread>个人设置</my-bread>
      </div>
      <el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form ref="form" :model="reqsform" label-width="80px">
              <el-form-item label="编号">1</el-form-item>
              <el-form-item label="手机：">147905</el-form-item>
              <el-form-item label="媒体名称：">
                <el-input v-model="reqsform.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍：">
                <el-input type="textarea" v-model="reqsform.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱：">
                <el-input type="email" v-model="reqsform.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">保存设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <!-- 添加素材弹框（上传） -->
            <el-upload
              class="avatar-uploader"
              :headers="headers"
              action="imageUrl"
              :show-file-list="false"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p style="text-align:center">修改头像</p>
          </div>
        </el-col>
      </el-col>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqsform: {
        //   用户名
        name: '',
        // 头条号简介
        intro: '',
        // 邮箱
        email: ''
      },
      // 添加素材相关数据
      imageUrl: '',
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('hm-toutiao-pc-84-user-key'))
            .token
      }
    }
  },
  methods: {
    onSave () {}
  }
}
</script>

<style lang="less" scoped>
</style>
