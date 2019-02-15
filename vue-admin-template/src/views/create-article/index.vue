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
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
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
    onSubmit() {
      this.$message('submit!')
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
