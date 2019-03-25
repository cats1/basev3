import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import 'font-awesome/css/font-awesome.css'
import App from './App'
import router from '@/router'
import store from '@/store'
import i18n from '@/lang'
import Print from 'vue-print-nb'
//import promise from 'es6-promise'
//promise.polyfill()
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
Vue.use(ElementUI, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(Print)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('token')
  if (token) {
    next()
  } else {
    window.location.href = 'signin.html'
  }
})
new Vue({
  el: '#app',
  store,
  router,
  i18n,
  components: { App },
  template: '<App/>'
})