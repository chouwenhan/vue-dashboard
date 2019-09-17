import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import Vue from 'vue'

export const url = 'http://35.184.71.189:3001/graphql/article'

const httpLink = new HttpLink({
  // 你需要在这里使用绝对路径
  uri: url
})

// 创建 apollo 客户端
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})
Vue.use(VueApollo)
