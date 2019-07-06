<template>
  <div class="artilce-list-container">
    <el-table :data="tableData" style="width: 90%; margin-left:10px; margin-right:10px;">
      <el-table-column prop="title" label="標題" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleLink(scope.row)"> {{ scope.row.title }} </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="tags" label="標籤" width="180"/>
      <el-table-column prop="content" label="內容"/>
      <el-table-column label="修改">
        <template slot-scope="scope">
          <i class="el-icon-edit" @click="modifyLink(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      tableData: []
    }
  },
  beforeMount() {
    this.$apollo.provider.defaultClient.query({
      query: gql`query {
        article_list {
          title
          content
          tags
          _id
        }
      }`
    }).then(data => {
      for (let i = 0; i < data.data.article_list.length; i++) {
        this.tableData.push(data.data.article_list[i])
      }
    }).catch(() => {
      alert('無法讀取文章列表')
    })
  },
  methods: {
    handleLink(row) {
      this.$router.push({ path: '/article/' + row._id })
    },
    modifyLink(row) {
      this.$router.push({ path: '/modify-article/' + row._id })
    }
  }
}
</script>
