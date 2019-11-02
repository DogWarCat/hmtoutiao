<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <my-bread>素材管理</my-bread>
    </div>
    <!-- 按钮组 -->
    <!-- 按钮单选框 label就是值 -->
    <div>
      <el-radio-group v-model="query.collect" @change="collectArticle">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <!-- 添加素材按钮 -->
      <el-button
        type="success"
        style="float: right;"
        size="small"
        @click="dialogVisible = true"
      >添加素材</el-button>
    </div>
    <!-- 素材列表 -->
    <div class="img_list">
      <div class="img_item" v-for="(item,index) in imagesList" :key="index">
        <el-image style="width: 180px; height: 180px" :src="item.url" fit="cover"></el-image>
        <!-- 图片底部按钮操作 -->
        <div class="footer">
          <i class="el-icon-star-off" :class="{red:item.is_collected}" @click="collectBtn(item)"></i>
          <i class="el-icon-delete" @click="open (item.id)"></i>
        </div>
      </div>
    </div>
    <!-- 添加素材弹框 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px" class="imgAlert">
      <el-upload
        class="avatar-uploader"
        :headers="headers"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        name="image"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      style="margin-top:50px"
      background
      layout="prev, pager, next"
      :total="total"
      @prev-click="page"
      @current-change="page"
      @next-click="page"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      query: {
        // 是否是收藏的图片
        collect: false,
        // 页数
        page: 1,
        // 每页数量
        per_page: 10
      },
      imagesList: {},
      total: 10,
      flag: true,
      dialogVisible: false,
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
    //   获取图片列表
    async getImage () {
      const {
        data: { data }
      } = await this.$axios.get('user/images', { params: this.query })
      this.imagesList = data.results
      this.total = data.total_count
      //   console.log(data.total_count)
    },
    // 分页
    async page (currentPage) {
      this.query.page = currentPage
      this.getImage()
    },
    // 收藏按钮
    async collectArticle () {
      this.query.page = 1
      this.getImage()
    },
    // 点击收藏（直接操作item里面的值了）
    async collectBtn (item) {
      const {
        data: { data }
      } = await this.$axios.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      console.log(data)
      //   因为red样式绑定的是item.is_collected，非data里的collect
      item.is_collected = data.collect
      this.$message.success(item.is_collected ? '收藏成功' : '取消收藏')
      //   this.getImage()
    },
    // 弹框
    open (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$axios.delete(`user/images/${id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getImage()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 图片上传
    handleAvatarSuccess (res) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(async () => {
        this.dialogVisible = false
        this.getImage()
        this.imageUrl = null
      }, 2000)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  },
  created () {
    this.getImage()
  }
}
</script>

<style lang="less" scoped>
.img_list {
  padding-top: 20px;
  .img_item {
    position: relative;
    width: 180px;
    height: 180px;
    display: inline-block;
    margin-right: 50px;
    margin-top: 20px;
    .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: rgba(0, 0, 0, 0.3);
      i {
        margin: 0 20px;
        color: white;
        &.red {
          color: red;
        }
      }
    }
  }
}
.imgAlert {
  text-align: center;
}
</style>
