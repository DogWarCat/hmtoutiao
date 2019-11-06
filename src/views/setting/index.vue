<template>
  <div class="container-setting">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-bread>个人设置</my-bread>
      </div>
      <el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form ref="form" :model="reqsform" label-width="100px">
              <el-form-item label="编号">{{reqsform.id}}</el-form-item>
              <el-form-item label="手机：">{{reqsform.mobile}}</el-form-item>
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
              action
              :headers="headers"
              :show-file-list="false"
              :http-request="myUpload"
            >
              <img v-if="reqsform.photo" :src="reqsform.photo" class="avatar" />
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
import eventBus from '@/eventBus'
import local from '@/utils/local'
export default {
  data () {
    return {
      reqsform: {
        // 用户id
        id: 1,
        //   用户名
        name: '',
        // 头条号简介
        intro: '',
        // 头像
        photo: null,
        // 邮箱
        email: '',
        // 手机号
        mobile: ''
      },
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('hm-toutiao-pc-84-user-key'))
            .token
      }
    }
  },
  methods: {
    // 头像上传相关操作(当自动上传用的是组件的上传时on-successs里的file才有（？？？）)
    // :on-successs="handleAvatarSuccess"
    // handleAvatarSuccess (res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw)
    // },
    //     - el-upload组件进行上传，默认上传请求方式是post
    // - 后台提供的接口，编辑头像的请求方式是 patch
    // - 导致：没有配置请求方式的属性，无法使用默认的组件上传。
    // - 方案：自己来上传
    // http-request 覆盖默认的上传行为，可以自定义上传的实现
    async myUpload ({ file }) {
      // console.log(file)
      const formData = new FormData()
      formData.append('photo', file)
      // patch:当只需要传部分参数时用patch
      const {
        data: { data }
      } = await this.$axios.patch('user/photo', formData)
      if (data) {
        this.$message.success('头像修改成功')
      }
      // console.log(data)
      // 预览
      this.reqsform.photo = data.photo
      //  发送头像信息给home组件(其他组件之间传递参数)
      //  eventBus.$emit('updatePhoto', data.photo)触发
      // eventBus.$on('updateName', name => (this.userInfo.name = name))绑定
      eventBus.$emit('updatePhoto', data.photo)
      // 修改本地存储
      const user = local.getUser()
      user.photo = data.photo
      local.setUser(user)
    },
    async getUser () {
      const {
        data: { data }
      } = await this.$axios.get('user/profile')
      this.reqsform = data
    },
    // 保存设置
    async onSave () {
      const {
        data: { data }
      } = await this.$axios.patch('user/profile', this.reqsform)
      if (data) {
        this.$message.success('信息保存成功')
      }
      // 发送用户名信息给home组件(其他组件之间传递参数)
      eventBus.$emit('updateName', data.name)
      // 修改本地存储
      const user = local.getUser()
      user.name = data.name
      local.setUser(user)
    }
  },
  created () {
    this.getUser()
  }
}
</script>

<style lang="less" scoped>
</style>
