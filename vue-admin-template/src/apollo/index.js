import ApolloClient from 'apollo-boost'

export const apolloClient = new ApolloClient({
  // 你需要在这里使用绝对路径
  uri: 'http://go_api/graphql/article'
})
