<template>
  <div class="container-publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-bread>{{articleId?'编辑文章':'发布文章'}}</my-bread>
      </div>
      <el-form ref="reqsform" :model="reqsform" label-width="120px">
        <el-form-item label="标题：">
          <el-input v-model="reqsform.title" style="width:400px"></el-input>
        </el-form-item>
        <!-- 内容：富文本 -->
        <el-form-item label="内容：">
          <!-- bidirectional data binding（双向数据绑定） -->
          <quill-editor v-model="reqsform.content" ref="myQuillEditor" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="标题：">
          <el-radio-group v-model="reqsform.cover.type" @change="reqsform.cover.images=[]">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 封面组件 -->
          <div>
            <my-image v-model="reqsform.cover.images[0]" v-show="reqsform.cover.type === 1"></my-image>
          </div>
          <div v-show="reqsform.cover.type === 3">
            <my-image v-model="reqsform.cover.images[i-1]" v-for="i in 3" :key="i"></my-image>
          </div>
        </el-form-item>
        <!-- 频道 -->
        <el-form-item label="标题：">
          <my-channel v-model="reqsform.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="publisArticle(false)">{{articleId?'编辑':'发表'}}</el-button>
          <el-button @click="publisArticle(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: { quillEditor },
  data () {
    return {
      reqsform: {
        // 文章标题
        title: '',
        // 文章内容
        content: '',
        // 封面
        cover: {
          // 封面类型
          // 封面类型 -1:自动，0-无图，1-1张，3-3张
          type: 1,
          images: []
        },
        // 文章所属频道id
        channel_id: null
      },
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            ['image']
          ]
        }
      },
      // url中对应的文章id
      articleId: ''
    }
  },
  methods: {
    async publisArticle (draft) {
      await this.$axios.post(`articles?draft=${draft}`, this.reqsform)
      this.$message.success(draft ? '已存为草稿' : '已发布')
      this.$router.push('/article')
    },
    async getArticle () {
      this.articleId = this.$route.query.id
      if (this.articleId) {
        // 获取文章信息
        const {
          data: { data }
        } = await this.$axios.get(`articles/${this.articleId}`)
        // console.log('data:' + data.cover.images)
        this.reqsform = data
      } else {
        this.reqsform = {
          // 文章标题
          title: '',
          // 文章内容
          content: '',
          // 封面
          cover: {
            // 封面类型
            // 封面类型 -1:自动，0-无图，1-1张，3-3张
            type: 1,
            images: []
          },
          // 文章所属频道id
          channel_id: null
        }
      }
    }
  },
  // 刚进页面的时候需要根据是编辑还是文章页来渲染页面
  // 从编辑进入时，发布文章页面填充了内容。再次点击发布文章，
  // 由于是直接在此页面跳转路由并没有重新进入，尽管url中id已经没有了
  // 但是页面还是有填充的内容，所以要用到watch
  // 还有页面回退时url中的id也会发生变化
  created () {
    this.getArticle()
  },

  // - 当你从编辑文章到发布文章，组件不初始化，重置表单信息。
  // - 使用watch来监听地址栏id的数据变化，重置表单信息。
  // - 其实还有特例情况：
  //   - 从发表文章，点击回退历史，切换到编辑文章
  //   - 使用watch来监听地址栏id的数据变化，获取表单信息。
  watch: {
    '$route.query.id': function (newValue) {
      this.getArticle()
    }
  }
  // watch: {
  //   'this.$route.query.id': function () {}
  // }
}
</script>

<style lang="less" scoped>
</style>
