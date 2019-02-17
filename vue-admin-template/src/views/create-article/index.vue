<template>
  <div class="create-artilce-container">
    <el-form label-width="100px">
      <el-form-item label="文章標頭">
        <el-input v-model="article.title"/>
      </el-form-item>
      <el-form-item label="文章標籤">
        <el-input v-model="article.tags"/>
      </el-form-item>
      <el-form-item label="文章內容">
        <el-input v-model="article.content" :rows="10" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">創建文章</el-button>
        <el-button @click="onCancel">取消</el-button>
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
        title: '',
        tags: '',
        content: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      // 调用 graphql 变更
      await this.$apollo.query({
        // 查询语句
        mutation: gql`mutation ($title: String!, $content: String!) {
          createArticle(title: $title, content: $content) {
            title
            content
            note
          }
        }`,
        // 参数
        variables: {
          title: this.title,
          content: this.content
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }

  }
}
</script>
