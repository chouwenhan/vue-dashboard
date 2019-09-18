<template>
  <div class="create-artilce-container">
    <el-form label-position="left" size="small" label-width="90px" style="width: 90%; margin-left:10px; margin-right:10px;">
      <el-form-item label="文章標頭">
        <el-input v-model="article.title"/>
      </el-form-item>
      <el-form-item label="文章標籤">
        <el-input v-model="article.tags"/>
      </el-form-item>
      <el-form-item label="文章內容">
        <el-input v-model="article.content" :autosize="{ minRows: 10}" type="textarea" />
      </el-form-item>
      <el-form-item label="上傳圖片" >
        <el-upload :on-change="fileChange" :auto-upload="false" action="" multiple>
          <el-button size="small" type="primary">上傳檔案</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button style="float: right;" @click="onCancel">取消</el-button>
        <el-button style="float: right;" type="primary" @click="onSubmit">創建文章</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
import gql from 'graphql-tag'
import { url } from '../../apollo/index.js'

export default {
  data() {
    return {
      article: {
        title: '',
        tags: '',
        content: ''
      },
      files: []
    }
  },
  methods: {
    onSubmit() {
      // 调用 graphql 变更
      this.$apollo.provider.defaultClient.mutate({
        mutation: gql`mutation ($title: String!, $tags: String!, $content: String!) {
          createArticle(title: $title, tags: $tags, content: $content) {
            title
            content
            tags
            _id
          }
        }`,
        // 参数
        variables: {
          title: this.article.title,
          content: this.article.content,
          tags: this.article.tags
        }
      }).then(data => {
        const uploadUrl = url + '/file/' + data.data.createArticle._id
        this.upLoad(uploadUrl)
      }).catch(() => {
        alert('創建文章失敗')
      })
    },
    onCancel() {
      alert('取消創建文章')
      this.$router.push({ path: '/article-list' })
    },
    fileChange(file) {
      this.files.push(file.raw) // 上传文件变化时将文件对象push进files数组
    },
    upLoad(uploadUrl) {
      const formData = new FormData()
      for (var i = 0; i < this.files.length; i++) {
        formData.append('files', this.files[i])
      }
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post(uploadUrl, formData, config).then(res => {
        console.log(res)
        alert('創建文章成功')
        this.$router.push({ path: '/article-list' })
      }).catch(error => {
        console.log(error.response)
      })
    }

  }
}
</script>
