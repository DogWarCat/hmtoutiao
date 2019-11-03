<template>
  <div class="my-bread">
    <div class="coverBtn" @click="openDialog">
      <img :src="changeImage" alt />
    </div>
    <!-- 封面对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <!-- 素材库/上传图片tasgs -->
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="素材库" name="first">
          <!-- 按钮组 -->
          <!-- 按钮单选框 label就是值 -->
          <div>
            <el-radio-group v-model="query.collect" @change="collectArticle" size="small">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 素材列表 -->
          <div class="img_list">
            <div
              class="img_item"
              :class="{selected:choseImgUrl===item.url}"
              @click="choseImgUrl=item.url"
              v-for="item in imagesList"
              :key="item.id"
            >
              <el-image
                style="width: 150px; height: 85px;margin-top: 18px;"
                :src="item.url"
                fit="cover"
              ></el-image>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            style="margin-top:18px"
            background
            layout="prev, pager, next"
            :total="total"
            @prev-click="page"
            @current-change="page"
            @next-click="page"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <!-- 添加素材弹框（上传） -->
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
        </el-tab-pane>
      </el-tabs>
      <!-- 封面对话框底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import imageUrl from '@/assets/default.png'
export default {
  data () {
    return {
      // 对话框是否关闭
      dialogVisible: false,
      //   tags默认选中
      activeName: 'first',
      // 获取用户图片素材接口返回数据
      imagesList: {},
      // 总图片数
      total: 10,
      // 素材选中属性(用图片的url来标识唯一性)
      choseImgUrl: '',
      // 添加素材相关数据
      imageUrl: '',
      // 替换默认图片
      changeImage: imageUrl,
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('hm-toutiao-pc-84-user-key'))
            .token
      },
      // 获取用户图片素材接口传参
      query: {
        // 是否是收藏的图片
        collect: false,
        // 页数
        page: 1,
        // 每页数量
        per_page: 8
      }
    }
  },
  // 素材库/上传图片tasgs点击事件
  methods: {
    // 弹出对话框事件
    openDialog () {
      this.dialogVisible = true
      this.getImage()
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    //   获取图片列表
    async getImage () {
      const {
        data: { data }
      } = await this.$axios.get('user/images', { params: this.query })
      this.imagesList = data.results
      this.total = data.total_count
      //   console.log(data.total_count)
    },
    // 顶部收藏按钮
    async collectArticle () {
      this.query.page = 1
      this.getImage()
    },
    // 分页
    async page (currentPage) {
      this.query.page = currentPage
      this.getImage()
    },
    // 图片上传
    handleAvatarSuccess (res) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.imageUrl = res.data.url
      this.choseImgUrl = this.imageUrl
      // this.$message.success('上传成功')
      // window.setTimeout(async () => {
      //   this.dialogVisible = false
      //   this.imageUrl = null
      // }, 5000)
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
    },
    // 点击确定
    submit () {
      this.dialogVisible = false
      this.changeImage = this.choseImgUrl
    }
  }
}
</script>

<style lang="less" scoped>
.my-bread {
  display: inline-block;
  margin-right: 10px;
  .coverBtn {
    width: 150px;
    height: 150px;
    border: 1px dashed #ccc;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .dialog-footer {
    display: block;
    text-align: center;
  }
}
// 素材列表
.img_list {
  //   padding-top: 20px;
  .img_item {
    width: 150px;
    height: 120px;
    display: inline-block;
    margin-right: 20px;
    margin-top: 10px;
    border: 1px dashed #ccc;
    text-align: center;
    position: relative;
    &.selected:after {
      position: absolute;
      top: 0;
      left: 0;
      width: 150px;
      height: 120px;
      content: '';
      display: block;
      // background:bg-color bg-image position/bg-size bg-repeat bg-origin bg-clip bg-attachment initial|inherit;
      background: rgba(0, 0, 0, 0.2) url('../assets/selected.png') center
        no-repeat/50px 50px;
    }
  }
}
// 上传居中
.avatar-uploader {
  text-align: center;
}
</style>
