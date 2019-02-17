import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { apolloClient } from './apollo'

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale }, VueApollo)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  apolloProvider,
  render: h => h(App)
})
