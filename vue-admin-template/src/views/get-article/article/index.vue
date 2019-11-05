<template>
  <div class="get-artilce-container">
    <el-form label-position="left" size="small" label-width="90px" style="width: 90%; margin-left:10px; margin-right:10px;">
      <el-form-item label="文章標頭">
        <el-form-item> {{ article.title }} </el-form-item>
      </el-form-item>
      <el-form-item label="文章標籤">
        <el-form-item> {{ article.tags }} </el-form-item>
      </el-form-item>
      <el-form-item label="文章內容">
        <el-form-item style="white-space: pre-wrap;">{{ article.content }}</el-form-item>
      </el-form-item>
      <el-form-item label="圖片" >
        <!--eslint-disable-next-line-->
        <img v-for="image in article.images" :src="image" style="display:block; padding-top:20px; width:60%; heigh:60%" >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import gql from 'graphql-tag'
// import axios from 'axios'

export default {
  data() {
    return {
      article: {
        _id: '',
        content: '',
        tags: '',
        title: '',
        type: '',
        images: []
      }
    }
  },
  beforeMount() {
    console.log(this.$route.params.id)
    this.$apollo.provider.defaultClient.query({
      query: gql`query ($_id: String!){
        article(_id: $_id) {
          title
          content
          tags
          _id
          type
          _attachments
        }
      }`,
      // 参数
      variables: {
        _id: this.$route.params.id
      }
    }).then(response => {
      var data = {}
      data = response.data
      this.article.title = data.article.title
      this.article.tags = data.article.tags
      this.article.content = data.article.content
      if (data.article._attachments) {
        for (var index in data.article._attachments) {
          const uploadUrl = 'http://35.226.52.119:5984' + '/article/' + this.$route.params.id + '/' + index
          this.article.images.push(uploadUrl)
        }
      }
    }).catch(() => {
      alert('無法讀取文章')
    })
  }
}
</script>
