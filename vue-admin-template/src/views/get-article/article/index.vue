<template>
  <div class="create-artilce-container">
    <el-form label-position="left" size="small" label-width="90px" style="width: 90%; margin-left:10px; margin-right:10px;">
      <el-form-item label="文章標頭">
        <el-form-item> {{ article.title }} </el-form-item>
      </el-form-item>
      <el-form-item label="文章標籤">
        <el-form-item> {{ article.note }} </el-form-item>
      </el-form-item>
      <el-form-item label="文章內容">
        <el-form-item> {{ article.content }} </el-form-item>
      </el-form-item>
      <el-form-item label="上傳圖片" >
        <el-upload :on-change="fileChange" :auto-upload="false" action="">
          <el-button size="small" type="primary">上傳檔案</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      article: {
        _id: '',
        content: '',
        note: '',
        title: '',
        type: ''
      }
    }
  },
  beforeMount() {
    console.log(this.$route.params.id)
    this.$apollo.provider.defaultClient.query({
      query: gql`query ($id: String!){
        article(id: $id) {
          title
          content
          note
          _id
          type
        }
      }`,
      // 参数
      variables: {
        id: this.$route.params.id
      }
    }).then(response => {
      var data = {}
      data = response.data
      this.article.title = data.article.title
      this.article.note = data.article.note
      this.article.content = data.article.content
    }).catch(() => {
      alert('無法讀取文章')
    })
  }
}
</script>
