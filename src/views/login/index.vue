<template>
  <!-- 全屏容器 -->
  <div class="container">
    <el-card>
      <img src="../../assets/logo_index.png" />
      <el-form ref="loginForm" :model="loginForm" status-icon :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:235px;margin-right:10px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox label="我已阅读并同意用户协议和隐私条款" :value="true"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" @click="login('loginForm')">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    var checkPhone = (rule, value, callback) => {
      if (
        /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(
          value
        )
      ) {
        callback()
      } else {
        callback(new Error('手机号格式有误'))
      }
    }
    return {
      loginForm: {
        mobile: '14790530268',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          },
          { len: 6, message: '验证码6个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // this.$axios
          //   .post('authorizations', this.loginForm)
          //   .then(res => {
          //     console.log(res)
          //     // 将服务器返回的token放入本地存储防止token失效过快
          //     local.setUser(res.data.data)
          //     this.$router.push('/')
          //   })
          //   .catch(err => {
          //     console.log(err)
          //     // 1. 201 OK
          //     // 2. 400 请求参数错误
          //     // 包括：参数缺失、手机号格式不正确、验证码失效等
          //     // 3.403 用户非实名认证用户，无权限登录
          //     // 4. 507 服务器数据库异常
          //     let httpCode = parseInt(err.message.substr(-3))
          //     if (httpCode === 403) {
          //       this.$message.error('用户非实名认证用户，无权限登录')
          //     } else if (httpCode === 400) {
          //       this.$message.error(
          //         '请求参数错误包括：参数缺失、手机号格式不正确、验证码失效等'
          //       )
          //     } else if (httpCode === 507) {
          //       this.$message.error('服务器数据库异常')
          //     }
          //   })
          try {
            const {
              data: { data }
            } = await this.$axios.post('authorizations', this.loginForm)
            // 将服务器返回的token放入本地存储防止token失效过快
            local.setUser(data)
            this.$router.push('/')
          } catch (err) {
            // console.log('err:' + err)
            // 1. 201 OK
            // 2. 400 请求参数错误
            // 包括：参数缺失、手机号格式不正确、验证码失效等
            // 3.403 用户非实名认证用户，无权限登录
            // 4. 507 服务器数据库异常
            let httpCode = parseInt(err.message.substr(-3))
            if (httpCode === 403) {
              this.$message.error('用户非实名认证用户，无权限登录')
            } else if (httpCode === 400) {
              this.$message.error(
                '请求参数错误包括：参数缺失、手机号格式不正确、验证码失效等'
              )
            } else if (httpCode === 507) {
              this.$message.error('服务器数据库异常')
            }
          }
        } else {
          this.$message.error('手机号或者验证码错误！')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: url(../../assets/login_bg.jpg) no-repeat center / cover;
  position: absolute;
  left: 0;
  top: 0;
  // 饿了么组件 el-card 组件名称  解析成HTML  后组件根元素上默认生成一个类和组件的名称一致
  .el-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      margin: 0 auto 30px;
    }
  }
}
</style>
