<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <my-bread>评论管理</my-bread>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数" width="180"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.comment_status"
            size="mini"
            type="danger"
            @click="handle(scope.row.id,false)"
          >关闭评论</el-button>
          <el-button v-else size="mini" type="success" @click="handle(scope.row.id,true)">打开评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="reqParams.per_page"
      :current-page="reqParams.page"
      :total="total"
      @current-change="page"
      @prev-click="page"
      @next-click="page"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 文章(评论)请求参数
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        // 每页显示条目个数
        per_page: 10,
        // 当前页数
        page: 1,
        // 返回数据的字段，
        // 不传返回用于内容管理的字段，
        // 传comment 返回用于评论管理
        // 的字段，传statistic
        // 返回用于图文数据的字段
        response_type: 'comment'
      },
      // 总条数
      total: 0,
      // 评论列表
      tableData: null
    }
  },
  methods: {
    async getComments () {
      // 注意：文章列表但是需要包含  评论相关信息
      const {
        data: { data }
      } = await this.$axios.get('articles', { params: this.reqParams })
      this.tableData = data.results
      this.total = data.total_count
      // console.log(this.total)
    },
    // 操作按钮
    handle (id, status) {
      this.$confirm(status ? '是否打开评论' : '是否关闭评论', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const {
            data: { data }
          } = await this.$axios.put(`comments/status?article_id=${id}`, {
            allow_comment: status
          })
          this.$message({
            type: data.allow_comment ? 'success' : 'warning',
            message: data.allow_comment ? '打开成功!' : '已关闭评论'
          })
          this.getComments()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // async handle (id, status) {
    //   await this.$axios.put(`comments/status?article_id=${id}`, {
    //     allow_comment: status
    //   })
    // },
    // 下一页
    page (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style>
</style>
