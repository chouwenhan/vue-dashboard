<template>
  <div class="modify-artilce-container">
    <el-form label-position="left" size="small" label-width="90px" style="width: 90%; margin-left:10px; margin-right:10px;">
      <el-form-item label="文章標頭">
        <el-input v-model="article.title"/>
      </el-form-item>
      <el-form-item label="文章標籤">
        <el-input v-model="article.tags"/>
      </el-form-item>
      <el-form-item label="文章內容">
        <el-input v-model="article.content"/>
      </el-form-item>
      <el-form-item label="上傳圖片" >
        <el-upload :on-change="fileChange" :auto-upload="false" action="">
          <el-button size="small" type="primary">上傳檔案</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button style="float: right;" @click="onCancel">取消</el-button>
        <el-button style="float: right;" type="primary" @click="onSubmit">修改文章</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import gql from 'graphql-tag'

export default {
  data() {
    return {
      article: {
        _id: '',
        content: '',
        tags: '',
        title: ''
      },
      files: []
    }
  },
  beforeMount() {
    console.log(this.$route.params.id)
    this.$apollo.provider.defaultClient.query({
      query: gql`query ($id: String!){
        article(_id: $id) {
          title
          content
          tags
          _id
        }
      }`,
      // 参数
      variables: {
        id: this.$route.params.id
      }
    }).then(response => {
      var data = {}
      data = response.data
      this.article._id = data.article._id
      this.article.title = data.article.title
      this.article.tags = data.article.tags
      this.article.content = data.article.content
    }).catch(() => {
      alert('無法讀取文章')
    })
  },
  methods: {
    onSubmit() {
      // 调用 graphql 变更
      this.$apollo.provider.defaultClient.mutate({
        mutation: gql`mutation ($_id: String!, $title: String!, $content: String!, $tags: String!) {
          updateArticle(_id: $_id, title: $title, content: $content, tags: $tags) {
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
          _id: this.article._id,
          tags: this.article.tags
        }
      }).then(data => {
        const uploadUrl = 'http://192.168.0.105:3001/graphql/article/file/' + data.data.updateArticle._id
        this.upLoad(uploadUrl)
        alert('修改文章成功')
        window.location.reload()
      }).catch((error) => {
        console.log(error)
        alert('修改文章失敗')
      })
    },
    onCancel() {
      alert('取消修改文章')
      window.location.reload()
    },
    fileChange(file) {
      this.files.push(file.raw) // 上传文件变化时将文件对象push进files数组
    },
    upLoad(uploadUrl) {
      const formData = new FormData()
      for (let i = 0; i < this.files.length; i++) {
        formData.append('file', this.files[i])
      }
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post(uploadUrl, formData, config).then(res => {
        console.log(res)
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error.response)
      })
    }

  }
}
</script>
