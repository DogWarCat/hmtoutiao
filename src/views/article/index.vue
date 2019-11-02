<template>
  <div class="container-article">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form ref="reqParams" :model="reqParams" label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :lable="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!--v-model做了两件事：  :value="reqParams.channel_id"  @input="把改变的数据设置给reqParams.channel_id" -->
          <!-- <my-channel :value="reqParams.channel_id" @input="value=>reqParams.channel_id=value"></my-channel> -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
          <!-- <el-select v-model="reqParams.channel_id" placeholder="请选择" clearable>
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="getDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selArticle">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card cardTwo">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询{{total_num}}到条结果</span>
      </div>
      <el-table :data="articles" style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image style="width:150px;height:100px" :src="scope.row.cover.images[0]" fit="fill">
              <div slot="error" class="image-slot">
                <img src="../../assets/error.gif" width="150" height="100" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button disabled type="info" plain v-if="scope.row.status === 0">草稿</el-button>
            <el-button disabled type="warning" plain v-if="scope.row.status === 1">待审核</el-button>
            <el-button disabled type="success" plain v-if="scope.row.status === 2">审核通过</el-button>
            <el-button disabled type="danger" plain v-if="scope.row.status === 3">审核失败</el-button>
            <el-button disabled type="danger" plain v-if="scope.row.status === 4">已删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              @click="editArticle (scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              @click="delArticle (scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total_num"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        class="cardTwo"
        @current-change="page"
        @prev-click="page"
        @next-click="page"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        // 每页显示条目个数
        per_page: 10,
        // 当前页数
        page: 1
      },
      // channelOptions: [
      //   {
      //     id: '',
      //     name: ''
      //   }
      // ],
      dateArr: [],
      articles: [],
      // 总页数
      total_num: 0
    }
  },
  methods: {
    async getArticle () {
      const {
        data: { data }
      } = await this.$axios.get('articles', { params: this.reqParams })
      this.articles = data.results
      // console.log('文章' + this.articles)
      this.total_num = data.total_count
    },
    async page (newPage) {
      this.reqParams.page = newPage
      this.getArticle()
    },
    // async getChannelOption () {
    //   const {
    //     data: { data }
    //   } = await this.$axios.get('channels')
    //   this.channelOptions = data.channels
    //   // console.log(this.channelOptions)
    // },
    getDate (dateArr) {
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    async selArticle (id) {
      // console.log(this.reqParams)
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      this.reqParams.page = 1
      this.getArticle()
    },
    async delArticle (id) {
      console.log(id)
      await this.$axios.delete(`articles/${id}`)
      this.$message.success('删除成功')
      this.getArticle()
    },
    async editArticle (id) {
      this.$router.push({ path: '/publish', query: { id } })
    }
  },
  created () {
    this.getArticle()
  }
}
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
.cardTwo {
  margin-top: 20px;
}
</style>
