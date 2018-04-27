import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import App from './App'
import "babel-polyfill"
import '@/icons'
import store from '@/store'
import i18n from '@/lang'
import 'font-awesome/css/font-awesome.css'
Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
