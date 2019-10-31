<template>
  <el-container class="container">
    <el-aside :width="isCollapse?'200px':'64px'">
      <!-- logo -->
      <div :class="{logo:isCollapse,logoMin:!isCollapse}"></div>
      <!-- 导航菜单 -->
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="!isCollapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture-outline"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-s-comment"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">素粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <i class="el-icon-s-fold logoButton" @click="isCollapse=!isCollapse"></i>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单组件 -->
        <el-dropdown class="dropdown" @command="handleClick">
          <span class="el-dropdown-link">
            <img :src="userInfo.photo" alt class="userPhoto" />
            <span class="userName">{{userInfo.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- 事件根本没有触发  click事件
                给组件绑定事件，如果组件不支持，事件不会触发。
                把事件绑定在 组件解析后的原生dom上
            事件修饰符：prevent once stop  native意思是把事件绑定在原生dom上-->
            <!-- <el-dropdown-item icon="el-icon-setting" @click.native="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="logOut">退出登录</el-dropdown-item>-->
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import local from '@/utils/local'
import router from '@/router'
export default {
  data () {
    return {
      isCollapse: true,
      userInfo: { name: '', photo: '' }
    }
  },
  created () {
    this.userInfo = local.getUser() || {}
    console.log(this.userInfo)
  },
  methods: {
    setting () {
      router.push('/setting')
    },
    logOut () {
      local.delUser()
      router.push('/login')
    },
    handleClick (command) {
      this[command]()
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/logo_admin.png) no-repeat
        center/140px auto;
    }
    .logoMin {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/logo_admin_01.png) no-repeat
        center/36px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    line-height: 60px;
    border-bottom: 1px solid #dddddd;
    .logoButton {
      vertical-align: middle;
      font-size: 30px;
    }
    .text {
      margin-left: 10px;
      vertical-align: middle;
    }
    .dropdown {
      float: right;
      .userPhoto {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .userName {
        font-weight: 800;
        vertical-align: middle;
        margin-left: 5px;
      }
    }
  }
}
</style>
