import "babel-polyfill"
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import App from './App'
import router from '@/router/emp'
import '@/icons'
import IconSvg from '@/components/Icon-svg'
import store from '@/store'
import i18n from '@/lang'
import 'font-awesome/css/font-awesome.css'
Vue.use(ElementUI, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
})
Vue.component('icon-svg', IconSvg)
Vue.config.productionTip = false
new Vue({
  el: '#app',
  store,
  i18n,
  router,
  components: { App },
  template: '<App/>'
})