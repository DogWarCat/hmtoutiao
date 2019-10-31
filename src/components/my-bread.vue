<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <slot></slot>
    </el-breadcrumb-item>
    <!-- <el-breadcrumb-item :to="{ path: '/image' }">素材管理</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/publish' }">发布文章</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/comment' }">评论管理</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/fans' }">粉丝管理</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/setting' }">个人设置</el-breadcrumb-item>-->
  </el-breadcrumb>
</template>

<script>
export default {}
</script>

<style>
</style>
