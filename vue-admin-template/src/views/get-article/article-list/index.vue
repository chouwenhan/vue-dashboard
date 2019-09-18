<template>
  <div class="artilce-list-container">
    <el-table :data="tableData" :default-sort ="{prop:'date',order:'descending'}" style="width: 90%; margin-left:10px; margin-right:10px;">
      <el-table-column prop="title" label="標題" sortable min-width= "15%">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleLink(scope.row)"> {{ scope.row.title }} </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="tags" label="標籤" sortable min-width= "10%"/>
      <el-table-column :show-overflow-tooltip="true" prop="content" label="內容" sortable min-width= "20%"/>
      <el-table-column prop="date" label="日期" sortable min-width= "20%"/>
      <el-table-column label="修改" min-width= "10%">
        <template slot-scope="scope">
          <i class="el-icon-edit" @click="modifyLink(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column label="刪除" min-width= "10%">
        <template slot-scope="scope">
          <i class="el-icon-delete" @click="deleteLink(scope.row)"/>
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
          date
        }
      }`
    }).then(data => {
      for (let i = 0; i < data.data.article_list.length; i++) {
        data.data.article_list[i].date = new Date(parseInt(data.data.article_list[i].date) * 1000).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ')
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
    },
    deleteLink(row) {
      confirm('確定要刪除 ' + row._id + ' 文章?')
      this.$apollo.provider.defaultClient.mutate({
        mutation: gql`mutation ($_id: String!) {
          deleteArticle(_id: $_id) {
            message
          }
        }`,
        // 参数
        variables: {
          _id: row._id
        }
      }).then(data => {
        alert('刪除文章成功')
        window.location.reload()
      }).catch(() => {
        alert('刪除文章失敗')
      })
    }
  }
}
</script>
