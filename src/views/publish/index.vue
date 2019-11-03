<template>
  <div class="container-publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-bread>发布文章</my-bread>
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
          <el-radio-group v-model="reqsform.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 封面组件 -->
          <div>
            <my-image v-show="reqsform.cover.type === 1"></my-image>
            <my-image v-show="reqsform.cover.type === 3"></my-image>
            <my-image v-show="reqsform.cover.type === 3"></my-image>
            <my-image v-show="reqsform.cover.type === 3"></my-image>
          </div>
        </el-form-item>
        <!-- 频道 -->
        <el-form-item label="标题：">
          <my-channel v-model="reqsform.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发表</el-button>
          <el-button>存入草稿</el-button>
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
          images: ''
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
      }
    }
  }
  //   methods: {
  //     onSubmit () {
  //       console.log('submit!')
  //     }
  //   }
}
</script>

<style lang="less" scoped>
</style>
